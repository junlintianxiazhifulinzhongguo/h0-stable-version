
import { 
    controller,
    get,
    post,
    put,
    del,
    use,
    all
  } from '../lib/decorator'

  import {
    getFlow
} from '../service/work'

  @controller('/api/v0/work')
  export class workController
  {
      @get("/")
      async getWork(ctx,next)
      {
          const result = {
              data: '全部工作'
          }
          ctx.body = {
              result
          }
      }
      @get("/flow")
      async getFlow(ctx,next)
      {
        const result =await getFlow()
        ctx.body = {
            result
        }
      }
  }