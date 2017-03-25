# Neutrino elm Preset

[![Build Status](https://travis-ci.org/guzart/neutrino-preset-elm.svg?branch=master)](https://travis-ci.org/guzart/neutrino-preset-elm)

## Requirements

- Node.js v6.9+
- Yarn or npm client
- Neutrino v5

## Installation

`neutrino-preset-elm` can be installed via the Yarn or npm clients. Inside your project, make sure
`neutrino` and `neutrino-preset-elm` are development dependencies.

#### Yarn

```bash
❯ yarn add --dev neutrino neutrino-preset-elm
```

#### npm

```bash
❯ npm install --save-dev neutrino neutrino-preset-elm
```

## Project Layout

`neutrino-preset-elm` follows the standard [project layout](https://neutrino.js.org/project-layout) specified by Neutrino. This
means that by default all project source code should live in a directory named `src` in the root of the
project. This includes JavaScript files, CSS stylesheets, images, and any other assets that would be available
to your compiled project.

## Quickstart

After installing Neutrino and the elm preset, add a new directory named `src` in the root of the project, with
a single JS file named `index.js` in it.

```bash
❯ mkdir src && touch src/index.js
```

This elm preset exposes an element in the page with an ID of `root` to which you can mount your application. Edit
your `src/index.js` file with the following:

```javascript
// src/index.js
const Elm = require('./Main.elm');
const mountNode = document.getElementById('root');
const app = Elm.Main.embed(mountNode);
```

Install the elm html packages.

```bash
❯ elm package install elm-lang/html
```

After doing this there should be a file called `elm-package.json` in the root of your project. Update the `elm-package.json` to tell elm to search for dependencies in the `src` directory.

```json
{
  "source-directories": [
    "src"
  ]
}
```

Add your elm application entry point to the `src` directory.

```bash
❯ touch  src/Main.elm
```


```elm
-- src/Main.elm
module App exposing (..)

import Html exposing (Html, div, text, program)

type alias Model =
    String

init : ( Model, Cmd Msg )
init =
    ( "Hello", Cmd.none )

type Msg
    = NoOp

view : Model -> Html Msg
view model =
    div []
        [ text model ]

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none

main : Program Never Model Msg
main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
```

Now edit your project's package.json to add commands for starting and building the application:

```json
{
  "scripts": {
    "start": "neutrino start --presets neutrino-preset-elm",
    "build": "neutrino build --presets neutrino-preset-elm"
  }
}
```

Start the app, then open a browser to the address in the console:

#### Yarn

```bash
❯ yarn start
✔ Development server running on: http://localhost:5000
✔ Build completed
```

#### npm

```bash
❯ npm start
✔ Development server running on: http://localhost:5000
✔ Build completed
```
