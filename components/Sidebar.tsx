/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import ReactIcon from '@/assets/icons/ReactIcon';
import JavascriptIcon from '@/assets/icons/JavascriptIcon';
import AndroidIcon from '@/assets/icons/AndroidIcon';
import IosIcon from '@/assets/icons/IosIcon';
import ServerIcon from '@/assets/icons/ServerIcon';
import { Listbox } from '@headlessui/react';

type NavRoute = {
    url: string;
    title: string;
};

interface Props {
    menu: boolean;
    nav: Record<string, Record<string, NavRoute>>;
}

const Sidebar: React.FC<Props> = ({ nav, menu }) => {
    const router = useRouter();
    const menuItem = [
        { id: 1, name: 'REACT', icon: <ReactIcon /> },
        { id: 2, name: 'ANDROID', icon: <AndroidIcon /> },
        { id: 3, name: 'IOS', icon: <IosIcon /> },
        { id: 4, name: 'JAVASCRIPT', icon: <JavascriptIcon /> },
        { id: 5, name: 'SERVER-SIDE', icon: <ServerIcon /> }
    ];
    const [tech, setTech] = React.useState(menuItem[0]);
    return (
        <div className="ctx">
            {/* Sidebar Version Section */}
            <section className="menu-container">
                <div className="menu-title">TECHNOLOGY</div>
                <Listbox value={tech} onChange={setTech}>
                    <Listbox.Button className="dropdown">
                        <div style={{ display: 'flex ', alignItems: 'center' }}>
                            {tech.icon} <span style={{ marginLeft: '1rem' }}>{tech.name}</span>
                        </div>
                        <ChevronDown />{' '}
                    </Listbox.Button>
                    <Listbox.Options className="dropdown-options">
                        {menuItem.map((m) => (
                            <Listbox.Option
                                key={m.id}
                                value={m}
                                className={({ active }) =>
                                    `${
                                        active
                                            ? 'dropdown-option dropdown-option-active'
                                            : 'dropdown-option'
                                    }`
                                }>
                                {m.icon} <span style={{ marginLeft: '1rem' }}>{m.name}</span>
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Listbox>
            </section>

            {/* Sidebar Menu Section */}

            {Object.entries(nav).map(([key, children], index) => (
                <section className="menu-container" key={`${key}-${index}`}>
                    <div className="menu-title">{key.replace(/-/g, ' ').toUpperCase()}</div>
                    {Object.entries(children).map(([_, route]) => (
                        <Link href={route.url} key={`${route.url}-${index}`}>
                            <div
                                className={`menu-item ${
                                    route.url === router.asPath ? 'active-link' : ''
                                }`}>
                                {route.title}
                            </div>
                        </Link>
                    ))}
                </section>
            ))}
            <style jsx>{`
                .ctx {
                    width: calc((100% - 1448px) / 2 + 298px);
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    height: calc(100vh - 80px);
                    min-width: 298px;
                    overflow-y: scroll;
                    padding-top: 20px;
                    top: ${menu ? '10px' : '60px'};
                    left: 0;
                    position: ${menu ? 'absolute' : 'sticky'};
                    background: var(--gray1);
                    z-index: 40;
                    border-right: 1px solid var(--gray6);
                }
                ::-webkit-scrollbar {
                    width: 0px;
                }
                ::-webkit-scrollbar-thumb {
                    outline: 0px;
                }
                .menu-container {
                    margin: 10px 0;
                }
                .menu-item {
                    cursor: pointer;
                    padding: 8px 0;
                    margin: 5px 0;
                    color: var(--gray12);
                    font-weight: 400;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    padding-left: 20px;
                }

                a {
                    text-decoration: none;
                }
                .active-link {
                    color: var(--gray12);
                    background-color: var(--blue6);
                }
                .menu-item:hover {
                    background-color: var(--blue5);
                }
                .menu-title {
                    padding-left: 20px;
                    font-weight: 700;
                    font-size: 15px;
                }
                @media screen and (max-width: 1000px) {
                    .ctx {
                        display: ${menu ? 'flex' : 'none'};
                        height: calc(100vh - 10px);
                    }
                    :global(.page) {
                        height: ${menu ? '100vh !important' : ''};
                        overflow: ${menu ? 'hidden !important' : ''};
                        padding-right: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Sidebar;

const ChevronDown = () => (
    <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
        style={{ color: 'var(--gray10)' }}>
        <path d="M6 9l6 6 6-6" />
    </svg>
);
