# react-micro-calendar

Simple react calendar and date picker component

## Getting started

### Installation

`npm install react-micro-calendar`

### Usage
Here's an example of basic usage

``` jsx
import MicroCalendar from 'react-micro-calendar'

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
```

### Options

#### Props

|Name|Description|Default|
|----|----|----|
|locale|dates locale|`"default"`|
|monthDisplayLength|Month length to display|`"long"`|
|weekdays|Array with week days to display |`['L', 'M', 'X', 'J', 'V', 'S', 'D']`|
|prevButton|Prev month button label|`"<"`|
|nextButton|Next month button label|`">"`|
|applySelectionButtonLabel|Apply date selection button label|`"OK"`|
|selectedClassName|Class name for selected day(s)|`"selected"`|
|todayClassName|Class name today|`"today"`|
|pastClassName|Class name for past days|`"past"`|
|futureClassName|Class name for future days|`"future"`|

#### Callback

|Name|Description|Example|
|----|----|----|
|onDateSelected|Function to be fired when date selection is completed|`onDateSelected={date => handleDate(date)}`|

### Styling

The calendar component has no built-in CSS, so it can be styled as you want.

## License

The MIT License.

## Contributing

As this package is in a very basic form, all contributions are welcome 😅
