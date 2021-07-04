import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { createClient } from 'pexels';
import { Rnd } from 'react-rnd';
import useLayerOrder from '../hooks/useLayerOrder';

const apiKey = process.env.REACT_APP_PEXELS_API;
const client = createClient(apiKey);

const PhotoLayer = ({ item, canvasSize }) => {
  const {
    imageID, display, name,
  } = item;

  const [imageURL, setImageURL] = useState('');
  const [boundaryWidth, setBoundaryWidth] = useState();
  const [boundaryHeight, setBoundaryHeight] = useState();
  const [imageWidth, setImageWidth] = useState();
  const [imageHeight, setImageHeight] = useState();
  const [loading, setLoading] = useState(false);
  const [imageRatio, setImageRatio] = useState();

  const zIndex = useLayerOrder(name);

  const adjustDimension = (imageAspectRatio, canvasAspectRatio) => {
    if(imageAspectRatio < canvasAspectRatio) {
      // h nya image > h nya canvas
      // draggable axis = y
      const hImage = canvasSize.width / imageAspectRatio;
      const hBoundary = hImage + hImage - canvasSize.height;
      setBoundaryHeight(hBoundary);
      setBoundaryWidth('100%');
      setImageHeight(hImage);
      setImageWidth(canvasSize.width);
    }else{
      // h nya image < h nya canvas
      // draggable axis = x
      const hImage = canvasSize.height;
      const wImage = imageAspectRatio * hImage;
      const wBoundary = wImage + wImage - canvasSize.width;
      setBoundaryHeight('100%');
      setBoundaryWidth(wBoundary);
      setImageHeight(hImage);
      setImageWidth(wImage);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      setLoading(true);
      const response = await client.photos.show({ id: imageID });
      setImageURL(response.src.large2x);
      setLoading(false);

      const { height, width } = response;

      const imageAspectRatio = width / height;
      const canvasAspectRatio = canvasSize.width / canvasSize.height;

      // Image aspect ratio will always be the same if canvas size is changed
      setImageRatio(imageAspectRatio);

      adjustDimension(imageAspectRatio, canvasAspectRatio);
    };

    getImage();
  }, [imageID]);

  useEffect(() => {
    if(imageRatio) {
      const canvasRatio = canvasSize.width / canvasSize.height;
      adjustDimension(imageRatio, canvasRatio);
    }
  }, [canvasSize.width, canvasSize.height]);

  if(!display) {
    return null;
  }

  return (
    <div
      style={{
        ...canvasSize,
        position: 'relative',
        zIndex,
      }}
    >
      <div
        id="photoBoundary"
        style={{
          width: boundaryWidth,
          height: boundaryHeight,
          // background: 'red',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {
        imageURL && !loading && (
        <Rnd
          bounds="#photoBoundary"
          default={{
            x: 0,
            y: 0,
          }}
        >
          <LazyLoadImage
            src={imageURL}
            alt="Background"
            effect="blur"
            draggable={false} // prevent ghost image
            style={{
              height: imageHeight,
              width: imageWidth,
              maxWidth: 'none',
            }}
            className="object-cover z-[45]"
          />
        </Rnd>
        )
      }
    </div>
  );
};

export default PhotoLayer;
