import React from 'react';
import reactDom from 'react-dom';

import { CalendarApp } from './CalendarApp';
import './styles.css';

reactDom.render(
    <CalendarApp />,
    document.getElementById('root')
);
