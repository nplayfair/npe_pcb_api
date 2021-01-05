const Router = require('koa-router')
const db = require('../../models'); 

const router = new Router()

// Create
router.post('/add', async ctx => {
  // TODO create a pcb
  let { pcbName, productCode, pcbType, description, image_url, bom } = ctx.request.body
  // Errors array
  let errors = []

  // Validate fields
  if (!pcbName) {
    errors.push({ text: "Please provide a PCB name"})
  }
  if (!pcbType) {
    errors.push({ text: "Please provide a PCB type"})
  }
  if (!productCode) {
    errors.push({ text: "Please provide a Product Code"})
  }
  if (!description || description.length === 0) {
    errors.push({ text: "Please provide a description"})
  }
  if (!image_url) {
    errors.push({ text: "Please provide an image URL"})
  }
  if (!bom) {
    errors.push({ text: "Please provide a BOM file"})
  }

  // Return errors or status 200 if none
  if (errors.length === 0) {
    // Form is valid
    const newPcb = db.Pcb.build({
      name: pcbName, 
      productCode, 
      type: pcbType, 
      description, 
      image_url, 
      bom
    })
    await newPcb.save()
    await ctx.render('add', {
        title: 'NPE PCB Utility',
        errors: [],
        message: 'PCB added successfully',
        pcbName: '',
        pcbType: '',
        productCode: '',
        description: '',
        image_url: '',
        bom: ''
      })
  }
  else {
    await ctx.render('add', {
      title: 'NPE PCB Utility',
      errors,
      message: '',
      pcbName,
      productCode, 
      pcbType, 
      description, 
      image_url, 
      bom
    })
  }

})

// Read all
router.get('/', async ctx => {
  ctx.body = await db.Pcb.findAll({ raw: true })
})

// Read one
router.get('/:prodCode', async ctx => {
  const prodCode = ctx.params.prodCode;
  ctx.body = await db.Pcb.findOne({ where: { productCode: prodCode } })
})

// Update a PCB
router.put('/:prodCode', async ctx => {
  const prodCode = ctx.params.prodCode;
  // TODO update a pcb
})

// Delete a PCB
router.delete('/:prodCode', async ctx => {
  const prodCode = ctx.params.prodCode;
  await db.Pcb.destroy({
    where: {
      productCode: prodCode
    }
  })
  this.body = { message: `PCB ${prodCode} deleted` }
})

module.exports = router