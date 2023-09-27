import { styled } from 'styled-components';
import Header from '../../component/Header';
import 'react-datepicker/dist/react-datepicker.css';
import FullSchedule from '../../component/DatePicker/ FullSchedule';
import ExcludeTimes from '../../component/DatePicker/ExcludeTimes';
import ScheduleMapLoader from '../../component/ScheduleMap';
export default function EditSchedule() {
  return (
    <>
      <Header />
      <MainContainer>
        <ScheduleMapLoader />
        <TitleContainer>
          <Title placeholder="제목 (최대 40자)"></Title>
          <FullSchedule />
        </TitleContainer>
        <CoreContainer>
          <ExcludeTimes />
        </CoreContainer>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Title = styled.input.attrs({ maxLength: 40 })`
  width: 40%;
  height: 30px;
  border: 2px solid #f46222;
  outline: none;
  margin-right: 36%;
`;

const CoreContainer = styled.div`
  width: 100%;
  height: 400px;
  background-color: #c7c7f6;
  margin-top: 5%;
`;
