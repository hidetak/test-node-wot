import { ExposedThing, Servient } from '@node-wot/core'
import { HttpServer } from '@node-wot/binding-http'

// create Servient add Http binding
const servient = new Servient()
const server = new HttpServer({
  port: 8080,
  allowSelfSigned: true,
  security: [
    {
      scheme: 'basic',
    },
  ],
})
servient.addCredentials({
  'urn:dev:test:MyCounter': {
    username: 'testuser',
    password: 'testpass',
  },
})
servient.addServer(server)

servient.start().then((WoT) => {
  WoT.produce({
    title: 'MyCounter',
    id: 'urn:dev:test:MyCounter',
    securityDefinitions: {
      basic_sc: { scheme: 'basic', in: 'header' },
    },
    security: ['basic_sc'],
    properties: {
      count: {
        type: 'integer',
        readOnly: false,
        observable: true,
      },
    },
  }).then((thing) => {
    let count = 0

    console.log('Produced ' + thing.getThingDescription().title)

    // set property handlers (using async-await)
    thing.setPropertyReadHandler('count', async () => count)
    thing.setPropertyWriteHandler('count', async (intOutput) => {
      const value = await intOutput.value()
      if (typeof value === 'number') {
        count = value
      }
      thing.emitPropertyChange('count')
    })

    thing.expose().then(() => {
      console.info(thing.getThingDescription().title + ' ready')
      console.info('TD : ' + JSON.stringify(thing.getThingDescription()))
    })

    /*setTimeout(async () => {
      console.debug('[debug] endServient called.')
      await server.destroy((thing as ExposedThing).id)
      console.debug('[debug] server destroyed.')
      await server.stop()
      console.debug('[debug] server stopped.')
      await servient.shutdown()
      console.debug('[debug] servient shutdown.')
    }, 10000)*/
  })
})
