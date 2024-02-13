import { ExposedThing, Servient } from '@node-wot/core'
import { MqttBrokerServer } from '@node-wot/binding-mqtt'

// create Servient add mqtt binding
const servient = new Servient()
const server = new MqttBrokerServer({
  uri: 'mqtt://test.mosquitto.org',
})
servient.addServer(server)

servient.start().then((WoT) => {
  WoT.produce({
    title: 'MyCounter',
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
    thing.setPropertyReadHandler('count', async () => {
      console.log('read count', count)
      return count
    })
    thing.setPropertyWriteHandler('count', async (intOutput) => {
      const value = await intOutput.value()
      console.log('write count', value)
      if (typeof value === 'number') {
        count = value
      }
      thing.emitPropertyChange('count')
    })

    thing.expose().then(() => {
      console.info(thing.getThingDescription().title + ' ready')
      console.info('TD : ' + JSON.stringify(thing.getThingDescription()))
    })
  })
})
