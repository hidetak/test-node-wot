import { Servient, Helpers } from '@node-wot/core'
import { CoapClientFactory } from '@node-wot/binding-coap'
import { ThingDescription } from 'wot-typescript-definitions'

// create Servient and add CoAP binding
const servient = new Servient()
servient.addClientFactory(new CoapClientFactory())

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
            href: 'coap://localhost:5683/mycounter/properties/count',
            contentType: 'application/json',
            op: ['observeproperty', 'unobserveproperty'],
            subprotocol: 'cov:observe',
          },
          {
            href: 'coap://localhost:5683/mycounter/properties/count',
            contentType: 'application/json',
            op: ['writeproperty', 'readproperty'],
          },
          {
            href: 'coap://localhost:5683/mycounter/properties/count',
            contentType: 'application/cbor',
            op: ['observeproperty', 'unobserveproperty'],
            subprotocol: 'cov:observe',
          },
          {
            href: 'coap://localhost:5683/mycounter/properties/count',
            contentType: 'application/cbor',
            op: ['writeproperty', 'readproperty'],
          },
        ],
        writeOnly: false,
      },
    },
    id: 'urn:uuid:d347ce11-4949-47e0-9885-20755a3b698b',
    forms: [
      {
        href: 'coap://localhost:5683/mycounter/properties',
        contentType: 'application/json',
        op: ['readmultipleproperties', 'readallproperties'],
      },
      {
        href: 'coap://localhost:5683/mycounter/properties',
        contentType: 'application/cbor',
        op: ['readmultipleproperties', 'readallproperties'],
      },
    ],
  } as ThingDescription

  try {
    const WoT = await servient.start()
    const thing = await WoT.consume(td)

    // read property
    const read1 = await thing.readProperty('count')
    console.log('count value is: ', await read1.value())

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
  } catch (err) {
    console.error('Script error:', err)
  }
}

main()
