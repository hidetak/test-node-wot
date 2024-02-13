import { Servient, Helpers } from '@node-wot/core'
import { MqttClientFactory } from '@node-wot/binding-mqtt'
import { ThingDescription } from 'wot-typescript-definitions'

// create Servient and add mqtt binding
const servient = new Servient()
servient.addClientFactory(new MqttClientFactory())

const main = async () => {
  const td: ThingDescription = {
    '@context': ['https://www.w3.org/2019/wot/td/v1', 'https://www.w3.org/2022/wot/td/v1.1', { '@language': 'en' }],
    '@type': 'Thing',
    title: 'MyCounter',
    securityDefinitions: { nosec_sc: { scheme: 'nosec' } },
    security: ['nosec_sc'],
    properties: {
      count: {
        type: 'integer',
        readOnly: false,
        observable: true,
        forms: [
          {
            href: 'mqtt://test.mosquitto.org/MyCounter/properties/count',
            contentType: 'application/json',
            op: ['readproperty', 'observeproperty', 'unobserveproperty'],
          },
          {
            href: 'mqtt://test.mosquitto.org/MyCounter/properties/count/writeproperty',
            contentType: 'application/json',
            op: ['writeproperty'],
          },
        ],
        writeOnly: false,
      },
    },
    id: 'urn:uuid:d885f665-ab0f-484e-9f03-1d5a927fefd8',
  } as ThingDescription

  try {
    const WoT = await servient.start()
    const thing = await WoT.consume(td)

    // read property
    thing.readProperty('count').then(async (count) => {
      console.log('count value is: ', await count.value())
    })

    // observe property
    const ob = await thing.observeProperty(
      'count',
      async (count) => {
        try {
          const countValue = await count.value()
          console.log('observed count value is: ', countValue)
        } catch (err) {
          console.error(`[error] failed to get property change. err:`, err)
        }
      },
      (err) => {
        console.error(`[error] property observe error. error: `, err)
      }
    )

    // write property
    console.log('write property', 100)
    await thing.writeProperty('count', 100)
  } catch (err) {
    console.error('Script error:', err)
  }
}

main()
