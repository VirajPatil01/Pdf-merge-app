
const express = require('express')
const path = require('path');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { mergePdfs } = require('./merge')
const app = express()

app.use('/static', express.static('public'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "template/index.html"))
})


app.post('/merge', upload.array('pdfs', 3), async (req, res, next) => {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  console.log(res.files)

  await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
  // res.send({data: req.files})
  res.redirect("http://localhost:3000/static/merged.pdf")
})




app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})