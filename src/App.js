import MicroCalendar from './lib/components/MicroCalendar';

const App = () => {
  const handleDate = date => {
    console.log(date)
  }
  
  return (
    <div className="App">
      <MicroCalendar onDateSelected={date => handleDate(date)} />
    </div>
  );
}

export default App;