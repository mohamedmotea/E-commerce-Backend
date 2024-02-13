import db_connection from '../DB/connection.js'
import globalResponse from './Middlewares/global-response.middleware.js'
import rollbackUploudedFiles from './Middlewares/rollback-uplouded-files-middleware.js'
import rollbackSavedDocuments from './Middlewares/rollback-saved-documents.middleware.js'
import * as router from './Modules/index.routers.js'

const initiateApp = (app,express)=>{
  const port = process.env.PORT
  
  db_connection()
  // parse data by express
  app.use(express.json())
  // routes
  app.use('/auth',router.authRouter)
  app.use('/user',router.userRouter)
  app.use('/category',router.categoryRouter)
  app.use('/subcategory',router.subCategoryRouter)
  app.use('/brand',router.brandRouter)
  app.use('/product',router.productRouter)
  
  // middleware to handle any errors
  app.use(globalResponse,rollbackUploudedFiles,rollbackSavedDocuments)
  
  // global router for handle invalid routes
  app.get('/', (req, res) => res.status(200).json({message:'invalid request'}))
  app.listen(port, () => console.log(`server app listening on port ${port}!`))
}
export default initiateApp