"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const MicroCalendar = props => {
  const {
    locale = 'default',
    monthDisplayLength = 'long',
    weekdays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    prevButton = '<',
    nextButton = '>',
    applySelectionButtonLabel = 'OK',
    onDateSelected,
    todayClassName = 'today',
    pastClassName = 'past',
    futureClassName = 'future',
    selectedClassName = 'selected'
  } = props;
  const [currentMonth, setCurrentMonth] = (0, _react.useState)(new Date().getMonth());
  const [currentYear, setCurrentYear] = (0, _react.useState)(new Date().getFullYear());
  const weeks = Array.from({
    length: 6
  }, i => i);
  const startOfMonth = new Date(currentYear, currentMonth).getDay() === 0 ? 6 : new Date(currentYear, currentMonth).getDay() - 1;
  const daysOnMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
  let currentDayOfMonth = 0;
  const [startDate, setStartDate] = (0, _react.useState)(null);
  const [endDate, setEndDate] = (0, _react.useState)(null);

  const prevMonth = () => {
    if (currentMonth - 1 < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth + 1 > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isToday = date => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const isPast = date => {
    return date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
  };

  const isFuture = date => {
    return date.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0);
  };

  const handleDateSelection = params => {
    const {
      currentYear,
      currentMonth,
      currentDay
    } = params;

    if (!startDate) {
      setStartDate(new Date(currentYear, currentMonth, currentDay));
    } else if (!endDate) {
      const selectedEndDate = new Date(currentYear, currentMonth, currentDay);

      if (selectedEndDate < startDate) {
        setEndDate(startDate);
        setStartDate(selectedEndDate);
      } else {
        setEndDate(selectedEndDate);
      }
    } else {
      setStartDate(new Date(currentYear, currentMonth, currentDay));
      setEndDate(null);
    }
  };

  const applyDateSelection = () => {
    onDateSelected({
      startDate,
      endDate
    });
    setStartDate(null);
    setEndDate(null);
  };

  const isDaySelected = date => {
    return date.setHours(0, 0, 0, 0) >= (startDate === null || startDate === void 0 ? void 0 : startDate.setHours(0, 0, 0, 0)) && date.setHours(0, 0, 0, 0) <= ((endDate === null || endDate === void 0 ? void 0 : endDate.setHours(23, 59, 59, 0)) || (startDate === null || startDate === void 0 ? void 0 : startDate.setHours(23, 59, 59, 0)));
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar-header"
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: prevMonth
  }, prevButton), /*#__PURE__*/_react.default.createElement("span", null, new Date(currentYear, currentMonth).toLocaleString(locale, {
    month: monthDisplayLength
  }), " ", currentYear), /*#__PURE__*/_react.default.createElement("button", {
    onClick: nextMonth
  }, nextButton)), /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, weekdays.map((day, i) => /*#__PURE__*/_react.default.createElement("th", {
    key: i
  }, day)))), /*#__PURE__*/_react.default.createElement("tbody", null, weeks.map((week, i) => {
    return /*#__PURE__*/_react.default.createElement("tr", {
      key: i
    }, weekdays.map((day, j) => {
      let dayClassList = [];

      if (i === 0 && j < startOfMonth || currentDayOfMonth >= daysOnMonth) {
        return /*#__PURE__*/_react.default.createElement("td", {
          key: j
        });
      } else {
        currentDayOfMonth++;
        const currentDay = currentDayOfMonth;
        const date = new Date(currentYear, currentMonth, currentDay);
        isToday(date) && dayClassList.push(todayClassName);
        isPast(date) && dayClassList.push(pastClassName);
        isFuture(date) && dayClassList.push(futureClassName);
        isDaySelected(date) && dayClassList.push(selectedClassName);
        return /*#__PURE__*/_react.default.createElement("td", _extends({
          key: j
        }, dayClassList.length > 0 && {
          className: dayClassList.join(' ')
        }, {
          onClick: () => handleDateSelection({
            currentYear,
            currentMonth,
            currentDay
          })
        }), currentDay);
      }
    }));
  })))), /*#__PURE__*/_react.default.createElement("div", {
    className: "calendar-controls"
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: applyDateSelection,
    disabled: !startDate && !endDate
  }, applySelectionButtonLabel)));
};

var _default = MicroCalendar;
exports.default = _default;