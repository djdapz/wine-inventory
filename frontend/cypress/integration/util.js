export const baselineServerSetup = () => {
    cy.server();

    cy.route('GET', '/wine', {
        wine: [
            {
                country: "Italy",
                producer: "Lionello Marchesi",
                quantity: 2,
                type: "Barolo",
                year: 2009,
                cellarLocation: "Upper Left",
                id: 12,
                bottleSize: 750,
                originalWoodenCase: true
            },
            {
                type: "Chianti",
                producer: "Monsanto",
                year: 2012,
                quantity: 8,
                country: "Italy",
                id: 15,
                notes: "Fancy Label",
                bottleSize: 1500,
                originalWoodenCase: false
            }
        ]
    }).as('getWines');

    cy.route({
        method: "GET",
        url: "/country/all",
        status: 201,
        response: {
            countries: [
                {"name": "Spain", code: "ES"},
                {"name": "Italy", code: "IT"}
            ]
        }
    }).as('getAllCountries');

    cy.route({
        method: "GET",
        url: "/country/top-5",
        status: 201,
        response: {
            countries: [
                {"name": "France", code: "FR"},
                {"name": "United States", code: "US"}
            ]
        }
    }).as('getTop5Countries');

  cy.route({
    method: 'GET',
    url: '/users',
    status: 200,
    response: {
      users: [
        { id: '112233', name: 'JIMMY_JOHN' },
        { id: '445566', name: 'Billy Bob' }
      ]
    }
  }).as('getUsers')
}