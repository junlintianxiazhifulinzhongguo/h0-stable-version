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
    getAll,
    getByUsername
} from '../service/administrators'
@controller('/api/v0/administrators')
export class administratorsController
{
    @get("/")
    async getAdministrators(ctx,next)
    {
        const result =await getAll()
        ctx.body = {
            result
        }
    }
    @get("/:username")
    async getAdministratorsByUsername(ctx,next)
    {
        const { username } = ctx.params
        const result =await getByUsername(username)
        ctx.body = {
            result
        }
    }
}