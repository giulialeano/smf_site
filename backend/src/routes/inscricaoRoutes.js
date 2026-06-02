const express = require('express');
const router = express.Router();
const inscricaoController = require('../controllers/inscricaoController');
const upload = require('../middleware/upload');

router.post('/', upload.single('comprovante'), inscricaoController.criarInscricao);
router.get('/', inscricaoController.listarInscricoes);

module.exports = router;