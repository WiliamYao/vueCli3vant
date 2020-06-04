/**
 * Created by zhanshen886 on 2019/7/24.
 */
import Vue from 'vue'

import {
    Button,
Image,
    Lazyload,
   Loading,
    Tag,
    Row,
    Col,
    Icon,
    Field,
    Cell,
    CellGroup,
    Popup,
    Dialog,
    Swipe,
    SwipeItem,
    Toast,
    Divider,
    RadioGroup,
    Radio,
    IndexBar,
    IndexAnchor,
    Checkbox,
    CheckboxGroup
} from 'vant';

Vue.use(Button);
Vue.use(Image);
Vue.use(Lazyload);
Vue.use(Loading);
Vue.use(Tag);
Vue.use(Col);
Vue.use(Row);
Vue.use(Icon);
Vue.use(Field);
Vue.use(Cell);
Vue.use(CellGroup);

Vue.use(Popup);
Vue.use(Dialog);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.prototype.Toast = Toast
Vue.use(Divider);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(IndexBar).use(IndexAnchor);
Vue.use(Checkbox).use(CheckboxGroup);
