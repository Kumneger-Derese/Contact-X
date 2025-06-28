import { styleText } from 'util';

const GreenLog = (text, color = 'greenBright') => {
  const res = styleText('bold', styleText(`${color}`, text));
  console.log(res);
};

const RedLog = (text, error) => {
  const res = styleText(
    `bold`,
    styleText('redBright', `${text} --> ${error.message}.`)
  );
  console.log(res);
};

export { GreenLog, RedLog };
