import React from 'react';

import { SvgProps } from 'react-native-svg';
import aquarius from '../../assets/icons/aquarius.svg';
import aries from '../../assets/icons/aries.svg';
import cancer from '../../assets/icons/cancer.svg';
import capricornius from '../../assets/icons/capricornius.svg';
import gemini from '../../assets/icons/gemini.svg';
import leo from '../../assets/icons/leo.svg';
import libra from '../../assets/icons/libra.svg';
import pisces from '../../assets/icons/pisces.svg';
import sagittariusSymbol from '../../assets/icons/sagittarius-symbol.svg';
import scorpius from '../../assets/icons/scorpius.svg';
import taurus from '../../assets/icons/taurus.svg';
import virgo from '../../assets/icons/virgo.svg';

const Icons = {
  aquarius,
  aries,
  cancer,
  capricornius,
  gemini,
  leo,
  libra,
  pisces,
  sagittariusSymbol,
  scorpius,
  taurus,
  virgo,
} as const;

type IIconNames = keyof typeof Icons;

interface IIconProps extends SvgProps {
  name: IIconNames;
}

const Icon: React.FC<IIconProps> = ({ name, ...rest }) => {
  const Component = Icons[name];

  return <Component {...rest} />;
};

export default Icon;
