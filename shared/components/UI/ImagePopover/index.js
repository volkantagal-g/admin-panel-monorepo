import { Popover } from 'antd';

import Image from "@shared/components/UI/Image";

export default function ImagePopover(props) {
  const {
    children,
    popoverHeight = 200,
    popoverWidth = "100%",
  } = props;

  const content = (
    <div>
      <Image {...props} height={popoverHeight} width={popoverWidth}/>
    </div>
  );

  return (
    <Popover {...props} content={content} placement="left">
      {children}
    </Popover>
  );
};
