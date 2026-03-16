/**
 * Style Layer — CSS 方案检测
 * 通过 mcp_chrome-devtools_evaluate_script 注入执行
 */

const detectCSSPattern = () => {
  const sampleClasses = [...document.querySelectorAll('*')]
    .slice(0, 200)
    .flatMap(el => [...el.classList])
    .slice(0, 100);
  const classStr = sampleClasses.join(' ');

  let cssPattern = 'vanilla-css';
  if (/\b(flex|pt-\d|px-\d|bg-|text-|w-\d|h-\d)/.test(classStr)) cssPattern = 'tailwind';
  else if (/\b(sc-|css-)/.test(classStr)) cssPattern = 'styled-components/emotion';
  else if (/[a-z]+_[a-zA-Z0-9]{5,}/.test(classStr)) cssPattern = 'css-modules';

  return { cssPattern, sampleClasses: sampleClasses.slice(0, 30) };
};
