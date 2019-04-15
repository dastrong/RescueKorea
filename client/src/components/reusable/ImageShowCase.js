import React, { useState, useEffect } from "react";
import { Icon, Modal, Segment, Rail } from "semantic-ui-react";
import ImgWithPlaceholder from "./ImgWithPlaceholder";
import "./ImageShowCase.css";

// uses a modal to create an img carousel
export default function({ targetImgId, isOpen, closeImageShowCase, images }) {
  const [imgId, setImgId] = useState(targetImgId);

  useEffect(() => {
    setImgId(targetImgId);
  }, [targetImgId]);

  const handlePrev = () => setImgId((imgId + 1) % images.length);
  const handleNext = () => setImgId((imgId + images.length - 1) % images.length);

  return (
    <Modal basic open={isOpen} className="img-showcase">
      <Modal.Content image>
        <Segment inverted color="olive">
          <ImgWithPlaceholder src={images[imgId]} alt={"pet-" + imgId} />
          <Rail
            as={Icon}
            onClick={handlePrev}
            content={<Icon color="purple" name="angle left" />}
            attached
            internal
            position="left"
          />
          <Rail
            as={Icon}
            onClick={handleNext}
            content={<Icon color="purple" name="angle right" />}
            attached
            internal
            position="right"
          />
          <Rail
            attached
            position="right"
            content={
              <Icon
                size="big"
                name="close"
                color="olive"
                className="closeIcon"
                onClick={closeImageShowCase}
              />
            }
          />
        </Segment>
      </Modal.Content>
    </Modal>
  );
}
