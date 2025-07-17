import ImagePopover from "@shared/components/UI/ImagePopover";
import Image from "@shared/components/UI/Image";

export default function ImageWithPopover(props) {
  const {
    popoverHeight,
    popoverWidth,
  } = props;

  return (
    <ImagePopover {...props} popoverHeight={popoverHeight} popoverWidth={popoverWidth}>
      <span>
        <Image {...props} />
      </span>
    </ImagePopover>
  );
};
