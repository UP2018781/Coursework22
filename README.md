# _Lego Store_

## Coding

### pages

All statically served to the clients, not sure if this is the best way to do it, may impliment server side page changing later but for now this works.

### casing

FunctionsLikeThis
variablesLikeThis
files.likethis

## End users

the end users will be people who are looking to buy lego bricks from many age ranges and also people who want to sell bricks. In this case the seller has been defined as one person: the store owner.

### what do they expect to see

end users need to be able to:

- easily navigate the website
  - after doing a basic outline of the navigation bar, I got feedback which said the basket and contact us would be better as icons (basket and phone respectively)

- see all the lego bricks available

- add bricks to a basket

- checkout & pay

### to do

- design a home page

- design a store page

![Store design](img/LegoStore.png)

Quick design in MSpaint, the idea is that when a brick is hovered over by the mouse, it gets larger and more information is displayed.

- design a basket page

- database
  - design a database system that is accessible for the server.
  - impliment the database system

- short term goals
  - create an algorithm that places a set number of items on the page, a 3x6 for example.
  - make sure the items are placed in the correct place when the user resizes the page, when theyre on mobile and any other scenario.
  - gridbox css?

### done

### maybe

## breakdown

- server

  - endpoints
  - database integration

- database
  - user storage
    - username
    - previous orders

  - brick storage
    - brick number
    - colour
    - amount in stock
    - price

  - orders
    - items included
    - date
    - time
    - delivery status

these database items should be everything required to run the current state of the website
along with allowing for some future implimentations (such as delivery tracking)

- client
