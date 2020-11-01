import React, { useState } from "react";
import {render} from "react-dom";
import { GameComponent } from "./components/Game";

import "./index.sass";

const root = document.getElementById('root')
render(<GameComponent />, root)