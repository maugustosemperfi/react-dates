import _extends from "@babel/runtime/helpers/esm/extends";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import shallowEqual from "enzyme-shallow-equal";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import moment from 'moment';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import { Portal } from 'react-portal';
import { forbidExtraProps } from 'airbnb-prop-types';
import { addEventListener } from 'consolidated-events';
import isTouchDevice from 'is-touch-device';
import OutsideClickHandler from 'react-outside-click-handler';
import SingleDatePickerShape from '../shapes/SingleDatePickerShape';
import { SingleDatePickerPhrases } from '../defaultPhrases';
import getResponsiveContainerStyles from '../utils/getResponsiveContainerStyles';
import getDetachedContainerStyles from '../utils/getDetachedContainerStyles';
import getInputHeight from '../utils/getInputHeight';
import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import _disableScroll from '../utils/disableScroll';
import noflip from '../utils/noflip';
import SingleDatePickerInputController from './SingleDatePickerInputController';
import DayPickerSingleDateController from './DayPickerSingleDateController';
import CloseButton from './CloseButton';
import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION, ANCHOR_LEFT, ANCHOR_RIGHT, OPEN_DOWN, OPEN_UP, DAY_SIZE, ICON_BEFORE_POSITION, INFO_POSITION_BOTTOM, FANG_HEIGHT_PX, DEFAULT_VERTICAL_SPACING, NAV_POSITION_TOP } from '../constants';
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps(_objectSpread(_objectSpread({}, withStylesPropTypes), SingleDatePickerShape)) : {};
var defaultProps = {
  // required props for a functional interactive SingleDatePicker
  date: null,
  focused: false,
  minDate: null,
  maxDate: null,
  // input related props
  id: 'date',
  placeholder: 'Date',
  ariaLabel: undefined,
  disabled: false,
  required: false,
  readOnly: false,
  screenReaderInputMessage: '',
  showClearDate: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  customInputIcon: null,
  customCloseIcon: null,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: DEFAULT_VERTICAL_SPACING,
  keepFocusOnInput: false,
  // calendar presentation and interaction related props
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  openDirection: OPEN_DOWN,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  appendToBody: false,
  disableScroll: false,
  initialVisibleMonth: null,
  firstDayOfWeek: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  renderCalendarInfo: null,
  calendarInfoPosition: INFO_POSITION_BOTTOM,
  hideKeyboardShortcutsPanel: false,
  daySize: DAY_SIZE,
  isRTL: false,
  verticalHeight: null,
  transitionDuration: undefined,
  horizontalMonthPadding: 13,
  // navigation related props
  dayPickerNavigationInlineStyles: null,
  navPosition: NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  renderNavPrevButton: null,
  renderNavNextButton: null,
  onPrevMonthClick: function onPrevMonthClick() {},
  onNextMonthClick: function onNextMonthClick() {},
  onClose: function onClose() {},
  onOutsideClick: function onOutsideClick() {},
  // month presentation and interaction related props
  renderMonthText: null,
  renderWeekHeaderElement: null,
  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  renderMonthElement: null,
  enableOutsideDays: false,
  isDayBlocked: function isDayBlocked() {
    return false;
  },
  isOutsideRange: function isOutsideRange(day) {
    return !isInclusivelyAfterDay(day, moment());
  },
  isDayHighlighted: function isDayHighlighted() {},
  // internationalization props
  displayFormat: function displayFormat() {
    return moment.localeData().longDateFormat('L');
  },
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
  phrases: SingleDatePickerPhrases,
  dayAriaLabelFormat: undefined
};

var SingleDatePicker = /*#__PURE__*/function (_ref) {
  _inheritsLoose(SingleDatePicker, _ref);

  var _proto = SingleDatePicker.prototype;

  _proto[!React.PureComponent && "shouldComponentUpdate"] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };

  function SingleDatePicker(props) {
    var _this;

    _this = _ref.call(this, props) || this;
    _this.isTouchDevice = false;
    _this.state = {
      dayPickerContainerStyles: {},
      isDayPickerFocused: false,
      isInputFocused: false,
      showKeyboardShortcuts: false
    };
    _this.onFocusOut = _this.onFocusOut.bind(_assertThisInitialized(_this));
    _this.onOutsideClick = _this.onOutsideClick.bind(_assertThisInitialized(_this));
    _this.onInputFocus = _this.onInputFocus.bind(_assertThisInitialized(_this));
    _this.onDayPickerFocus = _this.onDayPickerFocus.bind(_assertThisInitialized(_this));
    _this.onDayPickerBlur = _this.onDayPickerBlur.bind(_assertThisInitialized(_this));
    _this.showKeyboardShortcutsPanel = _this.showKeyboardShortcutsPanel.bind(_assertThisInitialized(_this));
    _this.responsivizePickerPosition = _this.responsivizePickerPosition.bind(_assertThisInitialized(_this));
    _this.disableScroll = _this.disableScroll.bind(_assertThisInitialized(_this));
    _this.setDayPickerContainerRef = _this.setDayPickerContainerRef.bind(_assertThisInitialized(_this));
    _this.setContainerRef = _this.setContainerRef.bind(_assertThisInitialized(_this));
    return _this;
  }
  /* istanbul ignore next */


  _proto.componentDidMount = function componentDidMount() {
    this.removeResizeEventListener = addEventListener(window, 'resize', this.responsivizePickerPosition, {
      passive: true
    });
    this.responsivizePickerPosition();
    this.disableScroll();
    var focused = this.props.focused;

    if (focused) {
      this.setState({
        isInputFocused: true
      });
    }

    this.isTouchDevice = isTouchDevice();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var focused = this.props.focused;

    if (!prevProps.focused && focused) {
      this.responsivizePickerPosition();
      this.disableScroll();
    } else if (prevProps.focused && !focused) {
      if (this.enableScroll) this.enableScroll();
    }
  }
  /* istanbul ignore next */
  ;

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.removeResizeEventListener) this.removeResizeEventListener();
    if (this.removeFocusOutEventListener) this.removeFocusOutEventListener();
    if (this.enableScroll) this.enableScroll();
  };

  _proto.onOutsideClick = function onOutsideClick(event) {};

  _proto.onInputFocus = function onInputFocus(_ref2) {
    var focused = _ref2.focused;
    var _this$props = this.props,
        onFocusChange = _this$props.onFocusChange,
        readOnly = _this$props.readOnly,
        withPortal = _this$props.withPortal,
        withFullScreenPortal = _this$props.withFullScreenPortal,
        keepFocusOnInput = _this$props.keepFocusOnInput;

    if (focused) {
      var withAnyPortal = withPortal || withFullScreenPortal;
      var moveFocusToDayPicker = withAnyPortal || readOnly && !keepFocusOnInput || this.isTouchDevice && !keepFocusOnInput;

      if (moveFocusToDayPicker) {
        this.onDayPickerFocus();
      } else {
        this.onDayPickerBlur();
      }
    }

    onFocusChange({
      focused: focused
    });
  };

  _proto.onDayPickerFocus = function onDayPickerFocus() {
    this.setState({
      isInputFocused: false,
      isDayPickerFocused: true,
      showKeyboardShortcuts: false
    });
  };

  _proto.onDayPickerBlur = function onDayPickerBlur() {
    this.setState({
      isInputFocused: true,
      isDayPickerFocused: false,
      showKeyboardShortcuts: false
    });
  };

  _proto.onFocusOut = function onFocusOut(e) {
    var onFocusChange = this.props.onFocusChange; // In cases where **relatedTarget** is not null, it points to the right
    // element here. However, in cases where it is null (such as clicking on a
    // specific day) or it is **document.body** (IE11), the appropriate value is **event.target**.
    //
    // We handle both situations here by using the ` || ` operator to fallback
    // to *event.target** when **relatedTarget** is not provided.

    var relatedTarget = e.relatedTarget === document.body ? e.target : e.relatedTarget || e.target;
    if (this.dayPickerContainer.contains(relatedTarget)) return;
    onFocusChange({
      focused: false
    });
  };

  _proto.setDayPickerContainerRef = function setDayPickerContainerRef(ref) {
    if (ref === this.dayPickerContainer) return;
    this.removeEventListeners();
    this.dayPickerContainer = ref;
    if (!ref) return;
    this.addEventListeners();
  };

  _proto.setContainerRef = function setContainerRef(ref) {
    this.container = ref;
  };

  _proto.addEventListeners = function addEventListeners() {
    // We manually set event because React has not implemented onFocusIn/onFocusOut.
    // Keep an eye on https://github.com/facebook/react/issues/6410 for updates
    // We use "blur w/ useCapture param" vs "onfocusout" for FF browser support
    this.removeFocusOutEventListener = addEventListener(this.dayPickerContainer, 'focusout', this.onFocusOut);
  };

  _proto.removeEventListeners = function removeEventListeners() {
    if (this.removeFocusOutEventListener) this.removeFocusOutEventListener();
  };

  _proto.disableScroll = function disableScroll() {
    var _this$props2 = this.props,
        appendToBody = _this$props2.appendToBody,
        propDisableScroll = _this$props2.disableScroll,
        focused = _this$props2.focused;
    if (!appendToBody && !propDisableScroll) return;
    if (!focused) return; // Disable scroll for every ancestor of this <SingleDatePicker> up to the
    // document level. This ensures the input and the picker never move. Other
    // sibling elements or the picker itself can scroll.

    this.enableScroll = _disableScroll(this.container);
  }
  /* istanbul ignore next */
  ;

  _proto.responsivizePickerPosition = function responsivizePickerPosition() {
    // It's possible the portal props have been changed in response to window resizes
    // So let's ensure we reset this back to the base state each time
    this.setState({
      dayPickerContainerStyles: {}
    });
    var _this$props3 = this.props,
        openDirection = _this$props3.openDirection,
        anchorDirection = _this$props3.anchorDirection,
        horizontalMargin = _this$props3.horizontalMargin,
        withPortal = _this$props3.withPortal,
        withFullScreenPortal = _this$props3.withFullScreenPortal,
        appendToBody = _this$props3.appendToBody,
        focused = _this$props3.focused;
    var dayPickerContainerStyles = this.state.dayPickerContainerStyles;

    if (!focused) {
      return;
    }

    var isAnchoredLeft = anchorDirection === ANCHOR_LEFT;

    if (!withPortal && !withFullScreenPortal) {
      var containerRect = this.dayPickerContainer.getBoundingClientRect();
      var currentOffset = dayPickerContainerStyles[anchorDirection] || 0;
      var containerEdge = isAnchoredLeft ? containerRect[ANCHOR_RIGHT] : containerRect[ANCHOR_LEFT];
      this.setState({
        dayPickerContainerStyles: _objectSpread(_objectSpread({}, getResponsiveContainerStyles(anchorDirection, currentOffset, containerEdge, horizontalMargin)), appendToBody && getDetachedContainerStyles(openDirection, anchorDirection, this.container))
      });
    }
  };

  _proto.showKeyboardShortcutsPanel = function showKeyboardShortcutsPanel() {
    this.setState({
      isInputFocused: false,
      isDayPickerFocused: true,
      showKeyboardShortcuts: true
    });
  };

  _proto.maybeRenderDayPickerWithPortal = function maybeRenderDayPickerWithPortal() {
    var _this$props4 = this.props,
        focused = _this$props4.focused,
        withPortal = _this$props4.withPortal,
        withFullScreenPortal = _this$props4.withFullScreenPortal,
        appendToBody = _this$props4.appendToBody;

    if (!focused) {
      return null;
    }

    if (withPortal || withFullScreenPortal || appendToBody) {
      return /*#__PURE__*/React.createElement(Portal, null, this.renderDayPicker());
    }

    return this.renderDayPicker();
  };

  _proto.renderDayPicker = function renderDayPicker() {
    var _this$props5 = this.props,
        anchorDirection = _this$props5.anchorDirection,
        openDirection = _this$props5.openDirection,
        onDateChange = _this$props5.onDateChange,
        date = _this$props5.date,
        minDate = _this$props5.minDate,
        maxDate = _this$props5.maxDate,
        onFocusChange = _this$props5.onFocusChange,
        focused = _this$props5.focused,
        enableOutsideDays = _this$props5.enableOutsideDays,
        numberOfMonths = _this$props5.numberOfMonths,
        orientation = _this$props5.orientation,
        monthFormat = _this$props5.monthFormat,
        dayPickerNavigationInlineStyles = _this$props5.dayPickerNavigationInlineStyles,
        navPosition = _this$props5.navPosition,
        navPrev = _this$props5.navPrev,
        navNext = _this$props5.navNext,
        renderNavPrevButton = _this$props5.renderNavPrevButton,
        renderNavNextButton = _this$props5.renderNavNextButton,
        onPrevMonthClick = _this$props5.onPrevMonthClick,
        onNextMonthClick = _this$props5.onNextMonthClick,
        onClose = _this$props5.onClose,
        onOutsideClick = _this$props5.onOutsideClick,
        withPortal = _this$props5.withPortal,
        withFullScreenPortal = _this$props5.withFullScreenPortal,
        keepOpenOnDateSelect = _this$props5.keepOpenOnDateSelect,
        initialVisibleMonth = _this$props5.initialVisibleMonth,
        renderMonthText = _this$props5.renderMonthText,
        renderWeekHeaderElement = _this$props5.renderWeekHeaderElement,
        renderCalendarDay = _this$props5.renderCalendarDay,
        renderDayContents = _this$props5.renderDayContents,
        renderCalendarInfo = _this$props5.renderCalendarInfo,
        renderMonthElement = _this$props5.renderMonthElement,
        calendarInfoPosition = _this$props5.calendarInfoPosition,
        hideKeyboardShortcutsPanel = _this$props5.hideKeyboardShortcutsPanel,
        firstDayOfWeek = _this$props5.firstDayOfWeek,
        customCloseIcon = _this$props5.customCloseIcon,
        phrases = _this$props5.phrases,
        dayAriaLabelFormat = _this$props5.dayAriaLabelFormat,
        daySize = _this$props5.daySize,
        isRTL = _this$props5.isRTL,
        isOutsideRange = _this$props5.isOutsideRange,
        isDayBlocked = _this$props5.isDayBlocked,
        isDayHighlighted = _this$props5.isDayHighlighted,
        weekDayFormat = _this$props5.weekDayFormat,
        styles = _this$props5.styles,
        verticalHeight = _this$props5.verticalHeight,
        transitionDuration = _this$props5.transitionDuration,
        verticalSpacing = _this$props5.verticalSpacing,
        horizontalMonthPadding = _this$props5.horizontalMonthPadding,
        small = _this$props5.small,
        reactDates = _this$props5.theme.reactDates;
    var _this$state = this.state,
        dayPickerContainerStyles = _this$state.dayPickerContainerStyles,
        isDayPickerFocused = _this$state.isDayPickerFocused,
        showKeyboardShortcuts = _this$state.showKeyboardShortcuts;
    var onOutsideClickImpl = onOutsideClick || this.onOutsideClick;
    var onOutsideClickWithPortal = !withFullScreenPortal && withPortal ? onOutsideClickImpl : undefined;
    var closeIcon = customCloseIcon || /*#__PURE__*/React.createElement(CloseButton, null);
    var inputHeight = getInputHeight(reactDates, small);
    var withAnyPortal = withPortal || withFullScreenPortal;
    /* eslint-disable jsx-a11y/no-static-element-interactions */

    /* eslint-disable jsx-a11y/click-events-have-key-events */

    return /*#__PURE__*/React.createElement("div", _extends({
      ref: this.setDayPickerContainerRef
    }, css(styles.SingleDatePicker_picker, anchorDirection === ANCHOR_LEFT && styles.SingleDatePicker_picker__directionLeft, anchorDirection === ANCHOR_RIGHT && styles.SingleDatePicker_picker__directionRight, openDirection === OPEN_DOWN && styles.SingleDatePicker_picker__openDown, openDirection === OPEN_UP && styles.SingleDatePicker_picker__openUp, !withAnyPortal && openDirection === OPEN_DOWN && {
      top: inputHeight + verticalSpacing
    }, !withAnyPortal && openDirection === OPEN_UP && {
      bottom: inputHeight + verticalSpacing
    }, orientation === HORIZONTAL_ORIENTATION && styles.SingleDatePicker_picker__horizontal, orientation === VERTICAL_ORIENTATION && styles.SingleDatePicker_picker__vertical, withAnyPortal && styles.SingleDatePicker_picker__portal, withFullScreenPortal && styles.SingleDatePicker_picker__fullScreenPortal, isRTL && styles.SingleDatePicker_picker__rtl, dayPickerContainerStyles), {
      onClick: onOutsideClickWithPortal
    }), /*#__PURE__*/React.createElement(DayPickerSingleDateController, {
      date: date,
      minDate: minDate,
      maxDate: maxDate,
      onDateChange: onDateChange,
      onFocusChange: onFocusChange,
      orientation: orientation,
      enableOutsideDays: enableOutsideDays,
      numberOfMonths: numberOfMonths,
      monthFormat: monthFormat,
      withPortal: withAnyPortal,
      focused: focused,
      keepOpenOnDateSelect: keepOpenOnDateSelect,
      hideKeyboardShortcutsPanel: hideKeyboardShortcutsPanel,
      initialVisibleMonth: initialVisibleMonth,
      dayPickerNavigationInlineStyles: dayPickerNavigationInlineStyles,
      navPosition: navPosition,
      navPrev: navPrev,
      navNext: navNext,
      renderNavPrevButton: renderNavPrevButton,
      renderNavNextButton: renderNavNextButton,
      onPrevMonthClick: onPrevMonthClick,
      onNextMonthClick: onNextMonthClick,
      onClose: onClose,
      renderMonthText: renderMonthText,
      renderWeekHeaderElement: renderWeekHeaderElement,
      renderCalendarDay: renderCalendarDay,
      renderDayContents: renderDayContents,
      renderCalendarInfo: renderCalendarInfo,
      renderMonthElement: renderMonthElement,
      calendarInfoPosition: calendarInfoPosition,
      isFocused: isDayPickerFocused,
      showKeyboardShortcuts: showKeyboardShortcuts,
      onBlur: this.onDayPickerBlur,
      phrases: phrases,
      dayAriaLabelFormat: dayAriaLabelFormat,
      daySize: daySize,
      isRTL: isRTL,
      isOutsideRange: isOutsideRange,
      isDayBlocked: isDayBlocked,
      isDayHighlighted: isDayHighlighted,
      firstDayOfWeek: firstDayOfWeek,
      weekDayFormat: weekDayFormat,
      verticalHeight: verticalHeight,
      transitionDuration: transitionDuration,
      horizontalMonthPadding: horizontalMonthPadding
    }), withFullScreenPortal && /*#__PURE__*/React.createElement("button", _extends({}, css(styles.SingleDatePicker_closeButton), {
      "aria-label": phrases.closeDatePicker,
      type: "button",
      onClick: onOutsideClickImpl
    }), /*#__PURE__*/React.createElement("div", css(styles.SingleDatePicker_closeButton_svg), closeIcon)));
    /* eslint-enable jsx-a11y/no-static-element-interactions */

    /* eslint-enable jsx-a11y/click-events-have-key-events */
  };

  _proto.render = function render() {
    var _this$props6 = this.props,
        id = _this$props6.id,
        placeholder = _this$props6.placeholder,
        ariaLabel = _this$props6.ariaLabel,
        disabled = _this$props6.disabled,
        focused = _this$props6.focused,
        required = _this$props6.required,
        readOnly = _this$props6.readOnly,
        openDirection = _this$props6.openDirection,
        showClearDate = _this$props6.showClearDate,
        showDefaultInputIcon = _this$props6.showDefaultInputIcon,
        inputIconPosition = _this$props6.inputIconPosition,
        customCloseIcon = _this$props6.customCloseIcon,
        customInputIcon = _this$props6.customInputIcon,
        date = _this$props6.date,
        onDateChange = _this$props6.onDateChange,
        displayFormat = _this$props6.displayFormat,
        phrases = _this$props6.phrases,
        onOutsideClick = _this$props6.onOutsideClick,
        withPortal = _this$props6.withPortal,
        withFullScreenPortal = _this$props6.withFullScreenPortal,
        screenReaderInputMessage = _this$props6.screenReaderInputMessage,
        isRTL = _this$props6.isRTL,
        noBorder = _this$props6.noBorder,
        block = _this$props6.block,
        small = _this$props6.small,
        regular = _this$props6.regular,
        verticalSpacing = _this$props6.verticalSpacing,
        reopenPickerOnClearDate = _this$props6.reopenPickerOnClearDate,
        keepOpenOnDateSelect = _this$props6.keepOpenOnDateSelect,
        styles = _this$props6.styles,
        isOutsideRange = _this$props6.isOutsideRange,
        isDayBlocked = _this$props6.isDayBlocked;
    var isInputFocused = this.state.isInputFocused;
    var enableOutsideClick = !withPortal && !withFullScreenPortal;
    var hideFang = verticalSpacing < FANG_HEIGHT_PX;
    var onOutsideClickImpl = onOutsideClick || this.onOutsideClick;
    var input = /*#__PURE__*/React.createElement(SingleDatePickerInputController, {
      id: id,
      placeholder: placeholder,
      ariaLabel: ariaLabel,
      focused: focused,
      isFocused: isInputFocused,
      disabled: disabled,
      required: required,
      readOnly: readOnly,
      openDirection: openDirection,
      showCaret: !withPortal && !withFullScreenPortal && !hideFang,
      showClearDate: showClearDate,
      showDefaultInputIcon: showDefaultInputIcon,
      inputIconPosition: inputIconPosition,
      isOutsideRange: isOutsideRange,
      isDayBlocked: isDayBlocked,
      customCloseIcon: customCloseIcon,
      customInputIcon: customInputIcon,
      date: date,
      onDateChange: onDateChange,
      displayFormat: displayFormat,
      onFocusChange: this.onInputFocus,
      onKeyDownArrowDown: this.onDayPickerFocus,
      onKeyDownQuestionMark: this.showKeyboardShortcutsPanel,
      screenReaderMessage: screenReaderInputMessage,
      phrases: phrases,
      isRTL: isRTL,
      noBorder: noBorder,
      block: block,
      small: small,
      regular: regular,
      verticalSpacing: verticalSpacing,
      reopenPickerOnClearDate: reopenPickerOnClearDate,
      keepOpenOnDateSelect: keepOpenOnDateSelect
    }, this.maybeRenderDayPickerWithPortal());
    return /*#__PURE__*/React.createElement("div", _extends({
      ref: this.setContainerRef
    }, css(styles.SingleDatePicker, block && styles.SingleDatePicker__block)), enableOutsideClick && /*#__PURE__*/React.createElement(OutsideClickHandler, {
      onOutsideClick: onOutsideClickImpl
    }, input), enableOutsideClick || input);
  };

  return SingleDatePicker;
}(React.PureComponent || React.Component);

SingleDatePicker.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
SingleDatePicker.defaultProps = defaultProps;
export { SingleDatePicker as PureSingleDatePicker };
export default withStyles(function (_ref3) {
  var _ref3$reactDates = _ref3.reactDates,
      color = _ref3$reactDates.color,
      zIndex = _ref3$reactDates.zIndex;
  return {
    SingleDatePicker: {
      position: 'relative',
      display: 'inline-block'
    },
    SingleDatePicker__block: {
      display: 'block'
    },
    SingleDatePicker_picker: {
      zIndex: zIndex + 1,
      backgroundColor: color.background,
      position: 'absolute'
    },
    SingleDatePicker_picker__rtl: {
      direction: noflip('rtl')
    },
    SingleDatePicker_picker__directionLeft: {
      left: noflip(0)
    },
    SingleDatePicker_picker__directionRight: {
      right: noflip(0)
    },
    SingleDatePicker_picker__portal: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      position: 'fixed',
      top: 0,
      left: noflip(0),
      height: '100%',
      width: '100%'
    },
    SingleDatePicker_picker__fullScreenPortal: {
      backgroundColor: color.background
    },
    SingleDatePicker_closeButton: {
      background: 'none',
      border: 0,
      color: 'inherit',
      font: 'inherit',
      lineHeight: 'normal',
      overflow: 'visible',
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      right: noflip(0),
      padding: 15,
      zIndex: zIndex + 2,
      ':hover': {
        color: "darken(".concat(color.core.grayLighter, ", 10%)"),
        textDecoration: 'none'
      },
      ':focus': {
        color: "darken(".concat(color.core.grayLighter, ", 10%)"),
        textDecoration: 'none'
      }
    },
    SingleDatePicker_closeButton_svg: {
      height: 15,
      width: 15,
      fill: color.core.grayLighter
    }
  };
}, {
  pureComponent: typeof React.PureComponent !== 'undefined'
})(SingleDatePicker);