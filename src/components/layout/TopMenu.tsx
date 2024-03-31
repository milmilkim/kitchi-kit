'use client';

import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import React, { useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { ModalContext } from '@/contexts/ModalContext';
import { useContext } from 'react';

import Login from '../modals/Login';

const TopMenu = () => {
  const { data: session } = useSession();
  const { openModal } = useContext(ModalContext);

  const start = <i className="pi pi-apple"></i>;
  const end = (
    <React.Fragment>
      <i className="pi pi-video" />
      <i className="pi pi-wifi" />
      <i className="pi pi-volume-up" />
      <span>Fri 13:07</span>
      <i className="pi pi-search" />
      <i className="pi pi-bars" />
    </React.Fragment>
  );

  const menubarItems: MenuItem[] = useMemo(() => {
    const items: MenuItem[] = [];

    if (session) {
      // 로그인한 사용자에게만 보이는 메뉴 항목 추가
      items.push({
        label: session.user?.name || '이름 없는 유저',
        className: 'menubar-root',
        items: [
          {
            label: '내 정보',
            icon: 'pi pi-fw pi-user',
            command: () => true,
          },
          {
            label: '로그아웃',
            icon: 'pi pi-fw pi-sign-out',
            command: () => signOut(),
          },
        ],
      });
    } else {
      items.push({
        label: '로그인',
        className: 'menubar-root',
        command: () => openModal('login', Login),
      });
    }

    return items;
  }, [session, openModal]);

  // const menubarItems: MenuItem[] = [
  //   {
  //     label: '내 정보',
  //     className: 'menubar-root',
  //   },
  //   {
  //     label: 'File',
  //     items: [
  //       {
  //         label: 'New',
  //         icon: 'pi pi-fw pi-plus',
  //         items: [
  //           {
  //             label: 'Bookmark',
  //             icon: 'pi pi-fw pi-bookmark',
  //           },
  //           {
  //             label: 'Video',
  //             icon: 'pi pi-fw pi-video',
  //           },
  //         ],
  //       },
  //       {
  //         label: 'Delete',
  //         icon: 'pi pi-fw pi-trash',
  //       },
  //       {
  //         separator: true,
  //       },
  //       {
  //         label: 'Export',
  //         icon: 'pi pi-fw pi-external-link',
  //       },
  //     ],
  //   },
  //   {
  //     label: 'Edit',
  //     items: [
  //       {
  //         label: 'Left',
  //         icon: 'pi pi-fw pi-align-left',
  //       },
  //       {
  //         label: 'Right',
  //         icon: 'pi pi-fw pi-align-right',
  //       },
  //       {
  //         label: 'Center',
  //         icon: 'pi pi-fw pi-align-center',
  //       },
  //       {
  //         label: 'Justify',
  //         icon: 'pi pi-fw pi-align-justify',
  //       },
  //     ],
  //   },
  //   {
  //     label: 'Users',
  //     items: [
  //       {
  //         label: 'New',
  //         icon: 'pi pi-fw pi-user-plus',
  //       },
  //       {
  //         label: 'Delete',
  //         icon: 'pi pi-fw pi-user-minus',
  //       },
  //       {
  //         label: 'Search',
  //         icon: 'pi pi-fw pi-users',
  //         items: [
  //           {
  //             label: 'Filter',
  //             icon: 'pi pi-fw pi-filter',
  //             items: [
  //               {
  //                 label: 'Print',
  //                 icon: 'pi pi-fw pi-print',
  //               },
  //             ],
  //           },
  //           {
  //             icon: 'pi pi-fw pi-bars',
  //             label: 'List',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     label: 'Events',
  //     items: [
  //       {
  //         label: 'Edit',
  //         icon: 'pi pi-fw pi-pencil',
  //         items: [
  //           {
  //             label: 'Save',
  //             icon: 'pi pi-fw pi-calendar-plus',
  //           },
  //           {
  //             label: 'Delete',
  //             icon: 'pi pi-fw pi-calendar-minus',
  //           },
  //         ],
  //       },
  //       {
  //         label: 'Archive',
  //         icon: 'pi pi-fw pi-calendar-times',
  //         items: [
  //           {
  //             label: 'Remove',
  //             icon: 'pi pi-fw pi-calendar-minus',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     label: 'Quit',
  //   },
  // ];

  return <Menubar model={menubarItems} start={start} end={end} />;
};

export default TopMenu;
