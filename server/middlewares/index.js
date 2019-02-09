import { resolve } from 'path'
import R from 'ramda'
const middlewares = ['common','router']
const useMiddlewares = (app) => {
    R.map(
      R.compose(
        R.forEachObjIndexed(
          initWith => initWith(app)
        ),
        require,
        name => resolve(__dirname,`./${name}`)
      )
    )(middlewares) 
 }
 export default useMiddlewares 