import { Servient, Helpers } from '@node-wot/core'
import { HttpClientFactory } from '@node-wot/binding-http'
import { ThingDescription } from 'wot-typescript-definitions'

// create Servient and add Http binding
const servient = new Servient()
servient.addCredentials({
  'urn:dev:test:MyCounter': {
    username: 'testuser',
    password: 'testpass',
  },
})
servient.addClientFactory(new HttpClientFactory())

const main = async () => {
  const td: ThingDescription = {
    '@context': ['https://www.w3.org/2019/wot/td/v1', 'https://www.w3.org/2022/wot/td/v1.1', { '@language': 'en' }],
    '@type': 'Thing',
    title: 'MyCounter',
    securityDefinitions: { basic_sc: { scheme: 'basic', in: 'header' } },
    security: ['basic_sc'],
    properties: {
      count: {
        type: 'integer',
        readOnly: false,
        observable: true,
        forms: [
          {
            href: 'http://localhost:8080/mycounter/properties/count',
            contentType: 'application/json',
            op: ['readproperty', 'writeproperty'],
          },
          {
            href: 'http://localhost:8080/mycounter/properties/count/observable',
            contentType: 'application/json',
            op: ['observeproperty', 'unobserveproperty'],
            subprotocol: 'longpoll',
          },
          {
            href: 'http://localhost:8080/mycounter/properties/count',
            contentType: 'application/cbor',
            op: ['readproperty', 'writeproperty'],
          },
          {
            href: 'http://localhost:8080/mycounter/properties/count/observable',
            contentType: 'application/cbor',
            op: ['observeproperty', 'unobserveproperty'],
            subprotocol: 'longpoll',
          },
          {
            href: 'http://192.168.64.1:8080/mycounter/properties/count',
            contentType: 'application/json',
            op: ['readproperty', 'writeproperty'],
          },
          {
            href: 'http://192.168.64.1:8080/mycounter/properties/count/observable',
            contentType: 'application/json',
            op: ['observeproperty', 'unobserveproperty'],
            subprotocol: 'longpoll',
          },
          {
            href: 'http://192.168.64.1:8080/mycounter/properties/count',
            contentType: 'application/cbor',
            op: ['readproperty', 'writeproperty'],
          },
          {
            href: 'http://192.168.64.1:8080/mycounter/properties/count/observable',
            contentType: 'application/cbor',
            op: ['observeproperty', 'unobserveproperty'],
            subprotocol: 'longpoll',
          },
          {
            href: 'http://[fd99:c218:5cf6:41eb:14d6:62d4:d7eb:a568]:8080/mycounter/properties/count',
            contentType: 'application/json',
            op: ['readproperty', 'writeproperty'],
          },
          {
            href: 'http://[fd99:c218:5cf6:41eb:14d6:62d4:d7eb:a568]:8080/mycounter/properties/count/observable',
            contentType: 'application/json',
            op: ['observeproperty', 'unobserveproperty'],
            subprotocol: 'longpoll',
          },
          {
            href: 'http://[fd99:c218:5cf6:41eb:14d6:62d4:d7eb:a568]:8080/mycounter/properties/count',
            contentType: 'application/cbor',
            op: ['readproperty', 'writeproperty'],
          },
          {
            href: 'http://[fd99:c218:5cf6:41eb:14d6:62d4:d7eb:a568]:8080/mycounter/properties/count/observable',
            contentType: 'application/cbor',
            op: ['observeproperty', 'unobserveproperty'],
            subprotocol: 'longpoll',
          },
          {
            href: 'http://192.168.0.154:8080/mycounter/properties/count',
            contentType: 'application/json',
            op: ['readproperty', 'writeproperty'],
          },
          {
            href: 'http://192.168.0.154:8080/mycounter/properties/count/observable',
            contentType: 'application/json',
            op: ['observeproperty', 'unobserveproperty'],
            subprotocol: 'longpoll',
          },
          {
            href: 'http://192.168.0.154:8080/mycounter/properties/count',
            contentType: 'application/cbor',
            op: ['readproperty', 'writeproperty'],
          },
          {
            href: 'http://192.168.0.154:8080/mycounter/properties/count/observable',
            contentType: 'application/cbor',
            op: ['observeproperty', 'unobserveproperty'],
            subprotocol: 'longpoll',
          },
        ],
        writeOnly: false,
      },
    },
    id: 'urn:dev:test:MyCounter',
    forms: [
      {
        href: 'http://localhost:8080/mycounter/properties',
        contentType: 'application/json',
        op: ['readallproperties', 'readmultipleproperties', 'writeallproperties', 'writemultipleproperties'],
      },
      {
        href: 'http://localhost:8080/mycounter/properties',
        contentType: 'application/cbor',
        op: ['readallproperties', 'readmultipleproperties', 'writeallproperties', 'writemultipleproperties'],
      },
      {
        href: 'http://192.168.64.1:8080/mycounter/properties',
        contentType: 'application/json',
        op: ['readallproperties', 'readmultipleproperties', 'writeallproperties', 'writemultipleproperties'],
      },
      {
        href: 'http://192.168.64.1:8080/mycounter/properties',
        contentType: 'application/cbor',
        op: ['readallproperties', 'readmultipleproperties', 'writeallproperties', 'writemultipleproperties'],
      },
      {
        href: 'http://[fd99:c218:5cf6:41eb:14d6:62d4:d7eb:a568]:8080/mycounter/properties',
        contentType: 'application/json',
        op: ['readallproperties', 'readmultipleproperties', 'writeallproperties', 'writemultipleproperties'],
      },
      {
        href: 'http://[fd99:c218:5cf6:41eb:14d6:62d4:d7eb:a568]:8080/mycounter/properties',
        contentType: 'application/cbor',
        op: ['readallproperties', 'readmultipleproperties', 'writeallproperties', 'writemultipleproperties'],
      },
      {
        href: 'http://192.168.0.154:8080/mycounter/properties',
        contentType: 'application/json',
        op: ['readallproperties', 'readmultipleproperties', 'writeallproperties', 'writemultipleproperties'],
      },
      {
        href: 'http://192.168.0.154:8080/mycounter/properties',
        contentType: 'application/cbor',
        op: ['readallproperties', 'readmultipleproperties', 'writeallproperties', 'writemultipleproperties'],
      },
    ],
  } as ThingDescription

  try {
    const WoT = await servient.start()
    const thing = await WoT.consume(td)

    // read property
    const read1 = await thing.readProperty('count')
    console.log('count value is: ', await read1.value())

    // write property
    setTimeout(async () => {
      console.log('write property', 100)
      await thing.writeProperty('count', 100)
    }, 1000)

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
