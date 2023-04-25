# Frontend Coding Challenge

### Glossary

| Term | Definition |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `ISIN` | The 12-digit alphanumeric code that uniquely identifies a specific instrument |
| `instrument` | A tradable asset, or a negotiable item, such as a security, commodity, derivative, or index, or any item that underlies a derivative. |
| `bid` | The highest price a buyer will pay to buy a specified number of shares of an instrument at any given time. |
| `ask` | The lowest price at which a seller will sell the instrument. |

---

## Application

### Tech stack
| Term            | Definition                                                                                                                                       |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| UI              | [Vue.js](https://vuejs.org/) + [Chart.js](https://vue-chartjs.org/)                                                                              |
| Styling         | [BEM](https://en.bem.info/methodology/) + CSS + [postcss-nesting](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting) |
| Storing         | [Pinia](https://pinia.vuejs.org/)                                                                                                                |
| Bundling        | [Vite](https://vitejs.dev/)                                                                                                                      |
| Testing         | [Vitest](https://vitejs.dev/)                                                                                                                    |
| Form validation | [Vuelidate](https://vuelidate-next.netlify.app/) + [Maska](https://beholdr.github.io/maska/#/)                                                   |

### Pre-requisites

Please make sure to have [Node](https://nodejs.org) 16 installed.

### Running the code

Once you have unzipped the folder and are ready to start, you can run `yarn` (or `npm install`) to install dependencies. After that, you can run:

```bash
# npm
npm run dev

# or yarn
yarn dev
```

This will start the application in development mode. It will also start the WebSocket server on port 8425. 

You can see the client application running in your browser by going to http://localhost:3000.

---

## Socket Reference

The WebSocket server is started in dev mode. You can then connect to it at:

```URL
ws://localhost:8425/
```

To subcribe to a specific security:

```JSON
{
    "subscribe": "${ISIN}"
}
```

To unsubscribe to a specific security:

```JSON
{
    "unsubscribe": "${ISIN}"
}
```

#### Example Request

To subscribe to the BASF instrument you would use:

```JSON
{
    "subscribe": "DE000BASF111"
}
```

#### Sample Response

You would then receive a WebSocket stream with messages in the following format:

```JSON
{
    "isin": "DE000BASF111",
    "price": 11.316359370403822,
    "bid": 11.306359370403822,
    "ask": 11.326359370403821
}
```

---

## Completed Tasks

### Task 1

Created a form that allows a user to submit an ISIN and add it to a watch list.

#### User Stories

> As a user, I should be able to submit an ISIN and it should be added to my watch list.

> As a user, I should not be able to subscribe to the same ISIN twice so that I don’t get confused by seeing multiple versions of the same stock.

> As a user, I should not be able to subscribe to an empty or invalid ISIN.

> Validation rules: An ISIN is a 12-character alphanumeric code. It consists of three parts: A two letter country code, a nine character alpha-numeric national security identifier, and a single check digit.
> Example:- US0378331005.

### Task 2

Created the UI and rendered the watch list created in the previous task to the DOM.

#### User Stories

> As a user, I should be able to view a list of my subscribed stocks displaying the latest stock price received from the WebSocket connection so that I can keep track of multiple stocks at the same time.

> As a user, I should be able to unsubscribe from a stock that’s in my watch list so that I can focus on the stocks I’m interested in.

> As a user, I should be notified if the websocket disconnects and the data is not up to date so that I know that the price is not accurate.

> As a user, I should be able to view their stocks on desktop and mobile screen widths so that I am able to use the app on my mobile browser.

---


## Todos
1. Add saving subscriptions to LocalStorage
2. Add subscription sorting and filtering

---

## Open Questions

1. What happens in case the WebSocket disconnects? How would you go further to keep
   the live data available or inform the user? Please discuss the challenges.
> If WebSocket is disconnected, the user will be notified of irrelevant instrument data.
2. What happens if a user adds an instrument multiple times to their list? Please discuss possible challenges and mitigations.
> If the user tries to add an already subscribed instrument, an error will be displayed after validating the form for subscriptions on the entered ISIN.
3. What potential performance issues might you face when this app scales with multiple subscriptions? How would you improve the speed and user experience?
> When scaling this application with multiple subscriptions, we may encounter performance issues like increased memory usage, reduced JS performance, network bottlenecks, and a slow and unresponsive UI. We can avoid these problems by using virtualization, pagination, and lazy loading.
