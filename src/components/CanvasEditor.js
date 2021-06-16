import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RndLayer from './RndLayer';
import { updateLayerLayout } from '../redux/layer/layerActions';
import useMapStateToArray from '../hooks/useMapStateToArray';

const CanvasEditor = ({ f }) => {
  const resultRef = useRef();
  const dispatch = useDispatch(null);
  const [activeLayerId, setActiveLayerId] = useState();

  const layersState = useSelector((state) => state.layer);

  const layerInstances = useMapStateToArray(layersState);

  // TODO: Make canvas size global
  const [canvasSize, setCanvasSize] = useState({
    width: 450,
    height: 450,
  });

  const updateX = (name, value) => {
    dispatch(updateLayerLayout(name, 'x', value));
  };

  const updateY = (name, value) => {
    dispatch(updateLayerLayout(name, 'y', value));
  };

  const updateWidth = (name, value) => {
    dispatch(updateLayerLayout(name, 'width', value));
  };

  const updateHeight = (name, value) => {
    dispatch(updateLayerLayout(name, 'height', value));
  };

  // Deactivate layer if clicking outside layer
  useEffect(() => {
    const deactivateLayer = (e) => {
      console.log(e.target.id);
      if(e.target.getAttribute('role') === 'region') {
        setActiveLayerId(e.target.id);
      }else{
        setActiveLayerId(null);
      }
    };

    window.addEventListener('mousedown', deactivateLayer);

    window.addEventListener('touchstart', deactivateLayer);

    return () => {
      window.removeEventListener('mousedown', deactivateLayer);
      window.removeEventListener('touchstart', deactivateLayer);
    };
  }, []);

  // Choose active layer id
  const setActive = (id) => {
    setActiveLayerId(id);
  };

  return (
    <main
      className="w-full h-full flex justify-center items-center relative bg-gray-300 min-w-[600px]"
    >

      {/* Canvas */}
      <div
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
        className="relative"
      >
        {/* shadow */}
        <div
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
          }}
          className="absolute shadow-canvas"
        >
        </div>
        <div
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
          }}
          id="canvas"
          ref={resultRef}
          className="relative z-10 overflow-hidden bg-gray-900"
        >

          {layerInstances && layerInstances.map((item) => {
            return (
              <RndLayer
                key={item.id}
                name={item.name}
                content={item.content}
                text={item.text}
                canvasSize={canvasSize}
                x={item.x}
                y={item.y}
                updateX={(value) => updateX(item.name, value)}
                updateY={(value) => updateY(item.name, value)}
                updateWidth={(value) => updateWidth(item.name, value)}
                updateHeight={(value) => updateHeight(item.name, value)}
                width={item.width}
                height={item.height}
                fontSize={item.fontSize}
                textColor={item.textColor}
                lineHeight={item.lineHeight}
                textAlignment={item.textAlignment}
                uppercase={item.uppercase}
                shadow={item.shadow}
                letterSpacing={item.letterSpacing}
                highlightColor={item.highlightColor}
                fontFamily={item.fontFamily}
                activeLayerId={activeLayerId}
                setActive={setActive}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default CanvasEditor;
