'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect, PropsWithChildren } from 'react';
import { Dock } from 'primereact/dock';
import { Tooltip } from 'primereact/tooltip';
import { TerminalService } from 'primereact/terminalservice';
import { Toast } from 'primereact/toast';

import '../demo.css';
import TopMenu from './TopMenu';

export default function AdvanceDemo({ children }: PropsWithChildren) {
  const toast = useRef<Toast>(null);
  const toast2 = useRef<Toast>(null);

  const dockItems = [
    {
      label: 'Finder',
      icon: () => <img alt="Finder" src="https://primefaces.org/cdn/primereact/images/dock/finder.svg" width="100%" />,
      command: () => {},
    },
    {
      label: 'Terminal',
      icon: () => <img alt="Finder" src="https://primefaces.org/cdn/primereact/images/dock/terminal.svg" width="100%" />,
      command: () => {},
    },
    {
      label: 'App Store',
      icon: () => <img alt="App Store" src="https://primefaces.org/cdn/primereact/images/dock/appstore.svg" width="100%" />,
      command: () => {},
    },
    {
      label: 'Safari',
      icon: () => <img alt="Finder" src="https://primefaces.org/cdn/primereact/images/dock/safari.svg" width="100%" />,
      command: () => {},
    },
    {
      label: 'Photos',
      icon: () => <img alt="Photos" src="https://primefaces.org/cdn/primereact/images/dock/photos.svg" width="100%" />,
      command: () => {},
    },
    {
      label: 'GitHub',
      icon: () => <img alt="Settings" src="https://primefaces.org/cdn/primereact/images/dock/github.svg" width="100%" />,
    },
    {
      label: 'Trash',
      icon: () => <img alt="trash" src="https://primefaces.org/cdn/primereact/images/dock/trash.png" width="100%" />,
      command: () => {},
    },
  ];

  const commandHandler = (text: string) => {
    let response;
    let argsIndex = text.indexOf(' ');
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

    switch (command) {
      case 'date':
        response = 'Today is ' + new Date().toDateString();
        break;

      case 'greet':
        response = 'Hola ' + text.substring(argsIndex + 1) + '!';
        break;

      case 'random':
        response = Math.floor(Math.random() * 100);
        break;

      case 'clear':
        response = null;
        break;

      default:
        response = 'Unknown command: ' + command;
        break;
    }

    if (response) {
      TerminalService.emit('response', response);
    } else {
      TerminalService.emit('clear');
    }
  };

  useEffect(() => {
    TerminalService.on('command', commandHandler);

    return () => {
      TerminalService.off('command', commandHandler);
    };
  }, []);

  return (
    <div className="card dock-demo">
      <Tooltip className="dark-tooltip" target=".dock-advanced .p-dock-action" my="center+15 bottom-15" at="center top" showDelay={150} />
      <TopMenu />
      <div className="dock-window dock-advanced">
        <Toast ref={toast} />
        <Toast ref={toast2} position="top-center" />
        {children}
        <Dock model={dockItems} />
      </div>
    </div>
  );
}
