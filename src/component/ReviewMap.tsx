import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MAIN_COLOR, YELLOW_COLOR } from '../color/color';

const KAKAO_API_KEY = import.meta.env.VITE_REACT_APP_KAKAO_MAP_API_KEY;

interface PlaceInfo {
  position: {
    lat: number;
    lng: number;
  };
  addressName: string;
  placeName: string;
  roadAddressName: string;
}

interface PlaceSearchResult {
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface SchduleMapLoaderProps {
  onPlacesSelected: (PlaceInfo: PlaceInfo[]) => void;
  mapPings?: Array<{ latitude: number; longitude: number; image: string; description: string }>; // mapPings 추가
  travelLongitude: number;
  travelLatitude: number;

  setTravelLatitude: (latitude: number) => void;
  setTravelLongitude: (longitude: number) => void;
}

export default function ReviewMap({
  mapPings,
  travelLongitude,
  travelLatitude,
  setTravelLatitude,
  setTravelLongitude,
}: SchduleMapLoaderProps) {
  const [searchPlace, setSearchPlace] = useState('');
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  // const [newLatitude, setNewLatitude] = useState(travelLongitude);
  //  const [newLongitude, setNewLongitude] = useState(travelLatitude);
  const [, setInfoWindowOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services`;
    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById('map') as HTMLElement; // 맵을 표시할 DOM 엘리먼트
        const options = {
          center: new kakao.maps.LatLng(travelLatitude, travelLongitude), // 초기 지도 중심 좌표
          level: 7, // 지도 확대 레벨
        };
        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap);
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const addMarker = (places: Array<{ latitude: number; longitude: number; image: string; description: string }>) => {
      if (!map) {
        return;
      }
      const bounds = new kakao.maps.LatLngBounds();
      places.forEach(place => {
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(place.latitude, place.longitude),
        });
        marker.setMap(map);
        bounds.extend(new kakao.maps.LatLng(place.latitude, place.longitude));

        const maxDescriptionLength = 5; // 문자 수

        const description =
          place.description.length > maxDescriptionLength
            ? `${place.description.slice(0, maxDescriptionLength)}...`
            : place.description;

        // 마커 클릭 시 표시될 정보 윈도우 생성
        const infowindow = new kakao.maps.InfoWindow({
          content: `
          <div style="padding: 5px 41px; font-size: 12px; display: flex; align-items: center; flex-direction: column;">
            <img src="${place.image[0]}" alt="First Image" style="max-width: 100%; max-height: 100px;"/>
            ${description}
            <button id="closeInfoWindow" style="cursor: pointer; background-color: transparent;
            border: none;
            color: ${MAIN_COLOR};">X</button>
          </div>
        `,
        });

        // 마커 클릭 이벤트 핸들러 등록
        kakao.maps.event.addListener(marker, 'click', () => {
          infowindow.open(map, marker);
          setInfoWindowOpen(true);

          const closeButton = document.getElementById('closeInfoWindow');
          if (closeButton) {
            closeButton.addEventListener('click', () => {
              infowindow.close();
              setInfoWindowOpen(false);
            });
          }
        });
      });

      if (map) {
        map.setBounds(bounds);
      }
    };

    if (mapPings && mapPings.length > 0) {
      addMarker(mapPings); // mapPings 정보를 사용하여 마커 추가
    }
  }, [mapPings]);

  const handleSearch = async () => {
    if (map) {
      const ps = new kakao.maps.services.Places();

      try {
        // 입력한 키워드로 장소를 검색
        const data = await new Promise<PlaceSearchResult[]>((resolve, reject) => {
          ps.keywordSearch(searchPlace, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              resolve(data);
            } else {
              reject(status);
            }
          });
        });

        const place = data[0];

        if (place) {
          setTravelLatitude(Number(place.y));
          setTravelLongitude(Number(place.x));
        }
      } catch (error) {
        console.error('검색 오류:', error);
      }
    }
  };

  return (
    <>
      <Con
        id="map"
        style={{
          width: '100%',
          height: '400px',
          border: `1px solid ${YELLOW_COLOR}`,
          borderRadius: '4px',
          margin: '0px',
        }}></Con>
      <Input
        type="text"
        placeholder="원하시는 장소를 검색해 관련 게시물을 보세요"
        onChange={e => setSearchPlace(e.target.value)}
      />
      <Button
        onClick={() => {
          handleSearch();
        }}>
        검색
      </Button>
    </>
  );
}

const Con = styled.div`
  margin: 5% auto;
`;

const Input = styled.input`
  width: 35%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${MAIN_COLOR};
  border-radius: 4px;
  transition: border-color 0.3s;
  outline: none;
  margin-bottom: 4px;
  margin-right: 4px;
  margin-top: 20px;

  &:focus {
    border-color: ${MAIN_COLOR};
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: #fff;
  border: 1px solid ${MAIN_COLOR};
  background: ${MAIN_COLOR};
  border-radius: 4px;
  transition: border-color 0.3s;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: ${MAIN_COLOR};
  }
`;
