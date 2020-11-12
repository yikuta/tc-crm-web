import TextModel from './text'
import TextareaModel from './textarea'
import RadioModel from './radio'
import CheckboxModel from './checkbox'
import NumberModel from './number'
import PhoneModel from './phone'
import DateModel from './date'
import TimeModel from './time'
import DateTimeModel from './dateTime'
import BooleanModel from './boolean'
import PercentageModel from './percentage'
import PictureModel from './picture'
import AreaModel from './area'
import DotModel from './dot'
import EditorModel from './editor'
import AddressModel from './address'

export const modelType = {
  Single_LineText: '',
  Multiline_Text: '',
  Single_Choice: null,
  Multiple_Choice: [],
  Number: null,
  Phone: '',
  DATE: '',
  TIME: '',
  DATE_TIME: '',
  BOOLEAN: null,
  PERCENTTAGE: '',
  PICTURE: '',
  AREA: [],
  ADDRESS: null,
  LOCATION: '',
  RICH_TEST: ''
}

export default {
  Single_LineText: TextModel,
  Multiline_Text: TextareaModel,
  Single_Choice: RadioModel,
  Multiple_Choice: CheckboxModel,
  Number: NumberModel,
  Phone: PhoneModel,
  DATE: DateModel,
  TIME: TimeModel,
  DATE_TIME: DateTimeModel,
  BOOLEAN: BooleanModel,
  PERCENTTAGE: PercentageModel,
  PICTURE: PictureModel,
  AREA: AreaModel,
  LOCATION: DotModel,
  RICH_TEST: EditorModel,
  ADDRESS: AddressModel
}
