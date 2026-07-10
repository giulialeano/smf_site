const pool = require('../config/database');
const path = require('path');

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/[<>]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

const criarInscricao = async (req, res) => {
  try {
    const { nomeCompleto, email, telefone, modalidade, nomeCracha } = req.body;
    const comprovante = req.file;

    // Validar campos obrigatórios
    if (!nomeCompleto || !email || !telefone || !modalidade || !nomeCracha) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Validar e-mail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'E-mail inválido' });
    }

    // Sanitizar dados
    const nomeSanitizado = sanitizeInput(nomeCompleto);
    const emailSanitizado = sanitizeInput(email).toLowerCase();
    const telefoneSanitizado = sanitizeInput(telefone);
    const nomeCrachaSanitizado = sanitizeInput(nomeCracha);

    // Verificar se e-mail já existe
    const emailExistente = await pool.query(
      'SELECT id FROM inscricoes WHERE email = $1',
      [emailSanitizado]
    );
    
    if (emailExistente.rows.length > 0) {
      return res.status(409).json({ error: 'E-mail já cadastrado' });
    }

    // Salvar comprovante
    let comprovanteUrl = null;
    if (comprovante) {
      comprovanteUrl = `/uploads/${comprovante.filename}`;
    }

    // Inserir no banco
    const result = await pool.query(
      `INSERT INTO inscricoes 
       (nome_completo, email, telefone, modalidade, nome_cracha, comprovante_url, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id`,
      [
        nomeSanitizado,
        emailSanitizado,
        telefoneSanitizado,
        modalidade,
        nomeCrachaSanitizado,
        comprovanteUrl,
        'pendente'
      ]
    );

    res.status(201).json({
      success: true,
      inscricaoId: result.rows[0].id,
      message: 'Inscrição realizada com sucesso!'
    });

  } catch (error) {
    console.error('Erro ao criar inscrição:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const listarInscricoes = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, nome_completo, email, telefone, modalidade, nome_cracha, status, created_at 
       FROM inscricoes 
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar inscrições:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = { criarInscricao, listarInscricoes };