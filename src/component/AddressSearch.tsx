import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAddress } from '../store/mapAddress';

import styled from 'styled-components';

declare global {
  interface Window {
    daum: any;
  }
}

const AddressSearch = () => {
  const dispatch = useDispatch();

  const [postcode, setPostcode] = useState<string>('');
  const [roadAddress, setRoadAddress] = useState<string>('');

  const handleDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        const roadAddr = data.roadAddress;
        const address = data.address;

        // 주소 정보 redux 스토어 추가함
        // 시,군,구 보내달라함
        dispatch(setAddress(address));

        setPostcode(data.zonecode);
        setRoadAddress(roadAddr);
      },
    }).open();
  };

  return (
    <div>
      <Input type="text" id="sample4_postcode" placeholder="우편번호" value={postcode} readOnly />
      <Button onClick={handleDaumPostcode}>주소 검색</Button>
      <br />
      <Input type="text" id="sample4_roadAddress" placeholder="도로명주소" value={roadAddress} readOnly />
    </div>
  );
};

export default AddressSearch;

const Input = styled.input`
  outline: 1px solid black;
  padding: 10px;
  margin-right: 20px;
`;

const Button = styled.button``;
