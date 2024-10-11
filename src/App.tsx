import type { ReactNode } from 'react';
import logo from './assets/tecnobit.svg';
import Assignment from './assignment/Assignment';
import './styles.css';

export default function App(): ReactNode {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gray-100">
      <img className="block mb-4 h-12" alt="Tecnobit" src={logo} />
      <div className="max-w-[600px] w-full bg-white rounded-md shadow-xl p-4">
        <Assignment />
      </div>
    </div>
  );
}
