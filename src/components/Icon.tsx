import React from 'react';

import { SvgProps } from 'react-native-svg';
import aquarius from '../../assets/icons/aquarius.svg';
import aries from '../../assets/icons/aries.svg';
import cancer from '../../assets/icons/cancer.svg';
import capricorn from '../../assets/icons/capricorn.svg';
import gemini from '../../assets/icons/gemini.svg';
import leo from '../../assets/icons/leo.svg';
import libra from '../../assets/icons/libra.svg';
import pisces from '../../assets/icons/pisces.svg';
import sagittarius from '../../assets/icons/sagittarius.svg';
import scorpio from '../../assets/icons/scorpio.svg';
import taurus from '../../assets/icons/taurus.svg';
import virgo from '../../assets/icons/virgo.svg';
import calendar from '../../assets/icons/calendar.svg';
import event from '../../assets/icons/event.svg';
import brightness from '../../assets/icons/brightness.svg';

const Icons = {
  aquarius,
  aries,
  cancer,
  capricorn,
  gemini,
  leo,
  libra,
  pisces,
  sagittarius,
  scorpio,
  taurus,
  virgo,
  calendar,
  brightness,
  event,
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
