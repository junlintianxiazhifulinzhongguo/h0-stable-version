import Router from'koa-router'
const router = new Router({
  prefix:'administrators'
})

router.get('/all', async (ctx, next) =>{
  ctx.state = {
    title: 'koa2 title'
  };

  await ctx.render('welcome', {title: ctx.state});
})

export const routers = (app) => { 
    app.use(router.routes())
       .use(router.allowedMethods())
}


@controller('/api/v0/administrators/')

export class administratorsController
{
    @get('all')
    async getAll (ctx,next) {

    }

}