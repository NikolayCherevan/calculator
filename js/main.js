//tabs
let windows_width = document.body.offsetWidth;

if(windows_width < 1000){
  document.querySelectorAll('.calculator__catalog__content').forEach((el1) => {
    el1.dataset.height = el1.offsetHeight + 'px';
    el1.style.height = '0';
    if(el1.classList.contains('calculator__catalog__content_active')){
      el1.style.height = el1.dataset.height;
    }
  })
}

window.addEventListener('resize', function(){
  setTimeout(() => {
    windows_width = document.body.offsetWidth;
    document.querySelectorAll('.calculator__catalog__content').forEach((el1) => {
      el1.style.height = 'auto';
      if(windows_width < 1000){
        el1.dataset.height = el1.offsetHeight + 'px';
        el1.style.height = '0';
        if(el1.classList.contains('calculator__catalog__content_active')){
          el1.style.height = el1.dataset.height;
        }
      }
    })
  }, 300);
});

if(document.querySelector('.calculator__field__prompt')){
  const prompt__txt_mb = document.querySelector(".calculator__field__prompt__txt_mb");
  document.querySelectorAll('.calculator__field__prompt__icon').forEach((el) => {
    el.addEventListener('click', () => {
      if(windows_width < 1000){
        prompt__txt_mb.innerHTML = el.closest('.calculator__field__prompt').querySelector('.calculator__field__prompt__txt').innerHTML;
        prompt__txt_mb.classList.add('calculator__field__prompt__txt_active');
        prompt__txt_mb.style.top = $(el).offset().top + 20 + 'px';
        el.closest('.calculator__field__prompt').querySelector('.calculator__field__prompt__icon').classList.add('calculator__field__prompt__icon_active')
      }
    })
  })
  $(document).mouseup(function (e){ // событие клика по веб-документу (or .on(touchstart click))
    var div = $(".calculator__field__prompt__txt_active"); // тут указываем ID элемента
    if (!div.is(e.target) && prompt__txt_mb){ // если клик был не по нашему блоку
      prompt__txt_mb.classList.remove('calculator__field__prompt__txt_active');
      if(document.querySelector('.calculator__field__prompt__icon_active')){
        document.querySelector('.calculator__field__prompt__icon_active').classList.remove('calculator__field__prompt__icon_active');
      }
    }
  });
}


const calculator_tabs = Array.from(document.querySelectorAll('.calculator__tabs__item'));
if(calculator_tabs){
  calculator_tabs.forEach((el) => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.tabs__content_active .calculator__catalog__content').forEach((el1) => {
        el1.style.height = 'auto';
        if(windows_width < 1000){
          el1.dataset.height = el1.offsetHeight + 'px';
          el1.style.height = '0';
          if(el1.classList.contains('calculator__catalog__content_active')){
            el1.style.height = el1.dataset.height;
          }
        }
      })
    })
  });
}
const tabs_calc = Array.from(document.querySelectorAll('.calculator__catalog__tabs__item'));
if(tabs_calc){
  tabs_calc.forEach((el) => {
    el.addEventListener('click', () => {
      if (!el.classList.contains('calculator__catalog__tabs__item_active')){
        let tabs_active=el.closest('.calculator__catalog').querySelectorAll('.calculator__catalog__tabs__item_active');
        let tabs_current=el.closest('.calculator__catalog').querySelectorAll('.calculator__catalog__tabs__item[data-tab="'+el.dataset.tab+'"]');
        for (var i = 0; i < tabs_active.length; i++) {
          tabs_active[i].classList.remove('calculator__catalog__tabs__item_active');
        }
        for (var i = 0; i < tabs_current.length; i++) {
          tabs_current[i].classList.add('calculator__catalog__tabs__item_active');
        }

        if(windows_width < 1000){
          el.closest('.calculator__catalog').querySelector('.calculator__catalog__content_active').style.height = '0';
          el.closest('.calculator__catalog').querySelector('.calculator__catalog__content_'+el.dataset.tab).style.height = el.closest('.calculator__catalog').querySelector('.calculator__catalog__content_'+el.dataset.tab).dataset.height;
        }

        el.closest('.calculator__catalog').querySelector('.calculator__catalog__content_active').classList.remove('calculator__catalog__content_active');
        el.closest('.calculator__catalog').querySelector('.calculator__catalog__content_'+el.dataset.tab).classList.add('calculator__catalog__content_active');
      }
    })
  });
}
const calc_switch = Array.from(document.querySelectorAll('.calculator__field__switch__input'));
if(calc_switch){
  calc_switch.forEach((el) => {
    el.addEventListener('change', function() {
      const content_block=this.closest('.tabs__content').querySelector('.calculator__catalog__content_'+this.closest('.calculator__catalog__tabs__item').dataset.tab);
      if (this.checked) {
        content_block.classList.remove('calculator__catalog__content_disabled');
        content_block.querySelectorAll('.calculator__field__input').forEach((el1) => {
          el1.removeAttribute("disabled");
        })
      } else {
        content_block.classList.add('calculator__catalog__content_disabled');
        content_block.querySelectorAll('.calculator__field__input').forEach((el1) => {
          el1.setAttribute("disabled", "disabled");
        })
      }
    });
  })
}

if(document.querySelector('.calculator__field__checkbox_main')){
  const checkbox_hole = document.querySelector('.calculator__field__checkbox_main');
  if (checkbox_hole.checked) {
    checkbox_hole.closest('.calculator__group').querySelectorAll('.calculator__field:not(.calculator__field_checkbox)').forEach((el) => {
      el.classList.remove('calculator__field_disabled');
    })
  } else {
    checkbox_hole.closest('.calculator__group').querySelectorAll('.calculator__field:not(.calculator__field_checkbox)').forEach((el) => {
      el.classList.add('calculator__field_disabled');
    })
  }
  checkbox_hole.addEventListener('change',function(){
    if (this.checked) {
      this.closest('.calculator__group').querySelectorAll('.calculator__field:not(.calculator__field_checkbox)').forEach((el) => {
        el.classList.remove('calculator__field_disabled');
        if(el.querySelector('input[type=text]')){
          el.querySelector('input[type=text]').removeAttribute('disabled');
        }
      })
    } else {
      this.closest('.calculator__group').querySelectorAll('.calculator__field:not(.calculator__field_checkbox)').forEach((el) => {
        el.classList.add('calculator__field_disabled');
        if(el.querySelector('input[type=text]')){
          el.querySelector('input[type=text]').setAttribute('disabled','disabled');
        }
      })
    }
  })
}

if(document.querySelector('.calculator__group_stickers')){
  document.querySelector('.calculator__group_stickers input[type="checkbox"]:checked').classList.add('calculator__field__checkbox_current');
  document.querySelector('.calculator__group_stickers .calculator__group input[type="checkbox"]').setAttribute('child-checkbox','1');
  if(document.querySelector('.calculator__group_stickers .calculator__group input[type="checkbox"]:checked')){
    document.querySelector('.calculator__group_stickers .calculator__field_small').classList.remove('calculator__field_disabled');
    document.querySelector('.calculator__group_stickers .calculator__field_small input').removeAttribute('disabled');
  }
  document.querySelectorAll('.calculator__group_stickers input[type="checkbox"]').forEach((el) => {
    el.addEventListener('click', () => {
      if (el.checked) {
        if(document.querySelector('.calculator__group_stickers .calculator__field__checkbox_current')){
          document.querySelector('.calculator__group_stickers .calculator__field__checkbox_current').checked = false;
          document.querySelector('.calculator__group_stickers .calculator__field__checkbox_current').classList.remove('calculator__field__checkbox_current');
        }
        el.classList.add('calculator__field__checkbox_current');

        if(el.getAttribute('child-checkbox')){
          if(document.querySelector('.calculator__group_stickers .calculator__field_small').classList.contains('calculator__field_disabled')){
            document.querySelector('.calculator__group_stickers .calculator__field_small').classList.remove('calculator__field_disabled');
            document.querySelector('.calculator__group_stickers .calculator__field_small input').removeAttribute('disabled');
          }
        }else{
          document.querySelector('.calculator__group_stickers .calculator__field_small').classList.add('calculator__field_disabled');
          document.querySelector('.calculator__group_stickers .calculator__field_small input').setAttribute('disabled','disabled');
        }
      } else {
        if(el.classList.contains('calculator__field__checkbox_current')){
          if(el.getAttribute('child-checkbox')){
            document.querySelector('.calculator__group_stickers .calculator__field_small').classList.add('calculator__field_disabled');
            document.querySelector('.calculator__group_stickers .calculator__field_small input').setAttribute('disabled','disabled');
          }
          el.classList.remove('calculator__field__checkbox_current');
        }
      }
    })
  })
}
/*
const arrSelects = document.querySelectorAll('.calculator .custom_select');
arrSelects.forEach((el) => {
    if(el.querySelector('input')){
        let i=0;
        const current_li_num = el.querySelector('input').value;
        el.querySelectorAll('.custom_select__item').forEach((li)=>{
            li.addEventListener('click', function() {
                //создаем класс для чередования фона в выпадающем списке
                let i=0;
                const current_li_num=this.getAttribute('data-value');
                this.closest('.custom_select__list').querySelectorAll('.custom_select__item').forEach((li)=>{
                    li.classList.remove('custom_select__item_white');
                    if(li.getAttribute('data-value') !== current_li_num){
                        if(i%2 === 0){
                            li.classList.add('custom_select__item_white');
                        }
                        i++;
                    }
                })
            })
            li.classList.remove('custom_select__item_white');
            if(li.getAttribute('data-value') !== current_li_num){
                if(i%2 == 0){
                    li.classList.add('custom_select__item_white');
                }
                i++;
            }
        })
    }
})
*/
/********** Основной массив с данными **********/

function get_data(unique_id) {
  return $(unique_id).data('form');
}

/********** Прайс ламинации **********/
let lamination_data = $('.calculator').data('lamination-price');

/********** Прайс печать **********/
let print_data = $('.calculator').data('print-price');

/********** Прайс печать **********/
let post_print_price = $('.calculator').data('post-print-work-price');

/********** Специальные виды ламинации **********/
let special_lam_types = ['454', '453', '456'];


/***** Start Обновить тип бумаги *****/
function updatePaperType(unique_id, paper_type_arr, current_block = '') {
  // Определяем идентификатор блока
  let block = getCurrentBlockId(current_block);

  // Получаем id текущего типа бумаги
  let current_input = $(unique_id).find('.js_' + block + 'paper_type_current_input');
  let current_id = $(current_input).attr('data-id');

  // Проверяем, есть ли текущее значение в новом массиве, если есть возвращаем его ID
  let current_index = checkIfNewArrayContainsCurrentId(paper_type_arr, current_id, 'paper_type_id');

  // START. Создаем новый список для селекта
  let list = '';
  let active_class;
  $.each(paper_type_arr, function (i, e) {
    if (i == current_index) {
      active_class = 'custom_select__item_active';
    } else {
      active_class = '';
    }
    list += '<li data-value="' + e.paper_type_id + '" data-number="' + e.paper_type_number + '" data-id="' + e.paper_type_id + '" class="custom_select__item ' + active_class + '">' + e.paper_type_title + '</li>';
  });
  // END. Создаем новый список для селекта

  // START. Обновляем данные для типа бумаги
  let title = paper_type_arr[current_index]['paper_type_title'];
  $(unique_id).find('.js_' + block + 'paper_type_current_title').text(title);
  $(current_input).val(paper_type_arr[current_index]['paper_type_id']);
  $(current_input).attr('data-number', paper_type_arr[current_index]['paper_type_number'])
  $(current_input).attr('data-id', paper_type_arr[current_index]['paper_type_id']);
  $(unique_id).find('.js_' + block + 'paper_type_list').html(list);
  // END. Обновляем данные для типа бумаги

  // Обновляем плотность бумаги
  updatePaperWeight(unique_id, paper_type_arr[current_index]['paper_weight'], current_block);
}

/***** End Обновить тип бумаги  *****/

function updatePaperSizeNew(unique_id, paper_size_arr, current_block = '') {
  // Определяем идентификатор блока
  let block = getCurrentBlockId(current_block);

  // Получаем id текущего типа бумаги
  let current_input = $(unique_id).find('.js_' + block + 'paper_size_current_input');
  let current_id = $(current_input).attr('data-id');

  // Проверяем, есть ли текущее значение в новом массиве, если есть возвращаем его ID
  let current_index = checkIfNewArrayContainsCurrentId(paper_size_arr, current_id, 'paper_size_id');
  // START. Создаем новый список для селекта
  let list = '';
  let active_class;
  $.each(paper_size_arr, function (i, e) {
    if (i == current_index) {
      active_class = 'custom_select__item_active';
    } else {
      active_class = '';
    }
    list += '<li data-value="' + e.paper_size_id + '" data-number="' + e.paper_size_number + '" data-id="' + e.paper_size_id + '" class="custom_select__item ' + active_class + '">' + e.paper_size_title + '</li>';
  });
  // END. Создаем новый список для селекта

  // START. Обновляем данные для типа бумаги
  console.log(paper_size_arr[current_index]['paper_size_title'])
  let title = paper_size_arr[current_index]['paper_size_title'];
  $(unique_id).find('.js_' + block + 'paper_size_current_title').text(title);
  $(current_input).val(paper_size_arr[current_index]['paper_size_id']);
  $(current_input).attr('data-number', paper_size_arr[current_index]['paper_size_number'])
  $(current_input).attr('data-id', paper_size_arr[current_index]['paper_size_id']);
  $(unique_id).find('.js_' + block + 'paper_size_list').html(list);
  // END. Обновляем данные для типа бумаги

  // Обновляем плотность бумаги
  updatePaperWeight(unique_id, paper_size_arr[current_index]['paper_weight'], current_block);
}

/***** Start Обновить плотность бумаги  *****/
function updatePaperWeight(unique_id, paper_weight_arr, current_block = '', is_module = 'no', module_index = 0) {
  // Определяем идентификатор блока
  let block = getCurrentBlockId(current_block);


  // Получаем id текущей плотности бумаги
  let current_input = $(unique_id).find('.js_' + block + 'paper_weight_current_input');
  let current_id = $(current_input).attr('data-id');

  // Проверяем, есть ли текущее значение в новом массиве, если есть возвращаем его ID
  let current_index = checkIfNewArrayContainsCurrentId(paper_weight_arr, current_id, 'paper_weight_id');

  // START. Создаем новый список для селекта
  let list = '';
  let active_class;
  $.each(paper_weight_arr, function (i, e) {
    if (i == current_index) {
      active_class = 'custom_select__item_active';
    } else {
      active_class = '';
    }
    list += '<li data-value="' + e.paper_weight_id + '" data-number="' + e.paper_weight_number + '" data-price="' + e.paper_weight_price + '" data-type-bend="' + e.paper_weight_bend_type + '" data-id="' + e.paper_weight_id + '" class="custom_select__item ' + active_class + '">' + e.paper_weight_title + '</li>';
  });
  // END. Создаем новый список для селекта

  // START. Обновляем данные для плотности бумаги
  let title = paper_weight_arr[current_index]['paper_weight_title'];
  $(unique_id).find('.js_' + block + 'paper_weight_current_title').text(title);
  $(current_input).val(paper_weight_arr[current_index]['paper_weight_id']);
  $(current_input).attr('data-number', paper_weight_arr[current_index]['paper_weight_number']);
  $(current_input).attr('data-id', paper_weight_arr[current_index]['paper_weight_id']);
  $(current_input).attr('data-type-bend', paper_weight_arr[current_index]['paper_weight_bend_type']);
  $(current_input).attr('data-price', paper_weight_arr[current_index]['paper_weight_price']);
  $(unique_id).find('.js_' + block + 'paper_weight_list').html(list);
  // END. Обновляем данные для плотности бумаги

  // Обновляем цветность печати
  updateColorPrinting(unique_id, paper_weight_arr[current_index]['color_printing'], current_block);
}

/***** End Обновить плотность бумаги  *****/


/***** Start Обновить цветность печати *****/
function updateColorPrinting(unique_id, color_printing_arr, current_block = '') {
  // Определяем идентификатор блока
  let block = getCurrentBlockId(current_block);

  // Получаем id текущей цветности печати
  let current_input = $(unique_id).find('.js_' + block + 'color_printing_current_input');
  let current_id = $(current_input).attr('data-id');

  // Проверяем, есть ли текущее значение в новом массиве, если есть возвращаем его ID
  let current_index = checkIfNewArrayContainsCurrentId(color_printing_arr, current_id, 'color_printing_id');

  // START. Создаем новый список для селекта
  let list = '';
  let active_class;
  $.each(color_printing_arr, function (i, e) {
    if (i == current_index) {
      active_class = 'custom_select__item_active';
    } else {
      active_class = '';
    }
    list += '<li data-value="' + e.color_printing_id + '" data-number="' + e.color_printing_number + '" data-id="' + e.color_printing_id + '" class="custom_select__item ' + active_class + '">' + e.color_printing_title + '</li>';
  });
  // END. Создаем новый список для селекта

  // START. Обновляем данные для цветности печати
  let title = color_printing_arr[current_index]['color_printing_title'];
  $(unique_id).find('.js_' + block + 'color_printing_current_title').text(title);
  $(current_input).val(color_printing_arr[current_index]['color_printing_id']);
  $(current_input).attr('data-number', color_printing_arr[current_index]['color_printing_number']);
  $(current_input).attr('data-id', color_printing_arr[current_index]['color_printing_id']);
  $(unique_id).find('.js_' + block + 'color_printing_list').html(list);
  // END. Обновляем данные для цветности печати
}

/***** End Обновить цветность печати  *****/


/***** Start Обновить ламинацию фронт *****/
function updateLaminationFront(unique_id, arr, current_block = '') {
  // Определяем идентификатор блока
  let block = getCurrentBlockId(current_block);

  // Получаем id текущего типа ламинации
  let current_input = $(unique_id).find('.js_' + block + 'lamination_front_input');
  let current_id = $(current_input).attr('data-id');

  // Проверяем, есть ли текущее значение в новом массиве, если есть возвращаем его ID
  let current_index = checkIfNewArrayContainsCurrentId(arr, current_id, 'lamination_id');

  // START. Создаем новый список для селекта
  let list = '';
  let active_class;
  $.each(arr, function (i, e) {
    if (i == current_index) {
      active_class = 'custom_select__item_active';
    } else {
      active_class = '';
    }
    list += '<li data-value="' + e.lamination_id + '" data-number="' + e.lamination_number + '" data-id="' + e.lamination_id + '" class="custom_select__item ' + active_class + '">' + e.lamination_title + '</li>';
  });
  // END. Создаем новый список для селекта

  // START. Обновляем данные для ламинации фронт
  if (current_input.length > 0) {
    let title = arr[current_index]['lamination_title'];
    $(unique_id).find('.js_' + block + 'lamination_front_current_title').text(title);
    $(current_input).val(arr[current_index]['lamination_id']);
    $(current_input).attr('data-number', arr[current_index]['lamination_number'])
    $(current_input).attr('data-id', arr[current_index]['lamination_id']);
    $(unique_id).find('.js_' + block + 'lamination_front_list').html(list);
  }
  // END. Обновляем данные для ламинации фронт
}

/***** End Обновить ламинацию фронт *****/


/***** Start Обновить ламинацию бэк *****/
function updateLaminationBack(unique_id, arr, current_block = '') {
  // Определяем идентификатор блока
  let block = getCurrentBlockId(current_block);

  let current_input = $(unique_id).find('.js_' + block + 'lamination_back_input');
  let current_id = $(current_input).attr('data-id');

  // Проверяем, есть ли текущее значение в новом массиве, если есть возвращаем его ID
  let current_index = checkIfNewArrayContainsCurrentId(arr, current_id, 'lamination_id');

  // START. Создаем новый список для селекта
  let list = '';
  let active_class;
  $.each(arr, function (i, e) {
    if (i == current_index) {
      active_class = 'custom_select__item_active';
    } else {
      active_class = '';
    }
    list += '<li data-value="' + e.lamination_id + '" data-number="' + e.lamination_number + '" data-id="' + e.lamination_id + '" class="custom_select__item ' + active_class + '">' + e.lamination_title + '</li>';
  });
  // END. Создаем новый список для селекта

  // START. Обновляем данные для ламинации бэк
  if (current_input.length > 0) {
    let title = arr[current_index]['lamination_title'];
    $(unique_id).find('.js_' + block + 'lamination_back_current_title').text(title);
    $(current_input).val(arr[current_index]['lamination_id']);
    $(current_input).attr('data-number', arr[current_index]['lamination_number'])
    $(current_input).attr('data-id', arr[current_index]['lamination_id']);
    $(unique_id).find('.js_' + block + 'lamination_back_list').html(list);
  }
  // END. Обновляем данные для ламинации бэк
}

/***** End Обновить ламинацию бэк *****/


/***** Start Проверяем, есть ли текущее значение в новом массиве *****/
function checkIfNewArrayContainsCurrentId(arr, current_id, field_name) {
  let current_index = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][field_name] == current_id) {
      current_index = i;
      break;
    }
  }

  return current_index;
}

/***** End Проверяем, есть ли текущее значение в новом массиве *****/


/***** Start Определяем идентификатор блока *****/
function getCurrentBlockId(current_block) {
  let block;
  if (current_block && current_block.length > 0) {
    block = current_block + '_';
  } else {
    block = '';
  }

  return block;
}

/***** End Определяем идентификатор блока *****/


/***** Start Количество изделий на одном листе бумаги *****/
function get_products_count_per_paper(unique_id, orientation = 'no', plus_fold = '', single = '', module_name = 'no', dif_prod_size = '') {
  // Ширина и высота изделия
  let product_width_val;
  let product_height_val;
  if (dif_prod_size === 'dif_prod_size' && module_name !== 'basis') {
    product_width_val = parseInt($(unique_id).find('.js_' + module_name + '_custom_product_width').val());
    product_height_val = parseInt($(unique_id).find('.js_' + module_name + '_custom_product_height').val());
  } else if (dif_prod_size === 'dif_prod_size' && module_name === 'basis') {
    product_width_val = parseInt($(unique_id).find('.js_' + module_name + '_custom_product_width').val());
    product_height_val = parseInt($(unique_id).find('.js_' + module_name + '_custom_product_height').val()) + parseInt($(unique_id).find('.js_' + module_name + '_custom_product_height').val()) + 70;
  } else {
    product_width_val = parseInt($(unique_id).find('.js_custom_product_width').val());
    product_height_val = parseInt($(unique_id).find('.js_custom_product_height').val());
  }

  // Инпут размера бумаги с доп данными
  let paper_size_input = $(unique_id).find('.js_paper_size_current_input');

  let paper_size_width, paper_size_height, paper_size_title;


  // Проверяем используется для расчета к-ства листов бумага размером А3 или нет
  if (module_name === 'no') {
    if ($(paper_size_input).attr('data-a3-status') === 'no') {
      if (single !== 'single') {
        paper_size_width = parseInt($(paper_size_input).attr('data-width'));
        paper_size_height = parseInt($(paper_size_input).attr('data-height'));
        paper_size_title = $(paper_size_input).attr('data-paper-title');
      } else {
        paper_size_width = parseInt($(unique_id).find('.js_paper_size_list li:eq(0)').attr('data-width'));
        paper_size_height = parseInt($(unique_id).find('.js_paper_size_list li:eq(0)').attr('data-height'));
        paper_size_title = $(unique_id).find('.js_paper_size_list li:eq(0)').attr('data-paper-title');
      }
    } else {
      paper_size_width = parseInt($(paper_size_input).attr('data-a3-width'));
      paper_size_height = parseInt($(paper_size_input).attr('data-a3-height'));
      paper_size_title = $(paper_size_input).attr('data-title');
    }
  } else {
    if ($(unique_id).find('.js_a3_' + module_name).attr('data-a3-status') === 'no') {
      paper_size_width = parseInt($(paper_size_input).attr('data-width'));
      paper_size_height = parseInt($(paper_size_input).attr('data-height'));
      paper_size_title = $(unique_id).find(paper_size_input).attr('data-paper-title');
    } else if (dif_prod_size === 'dif_prod_size') {
      paper_size_width = parseInt($(unique_id).find('.js_paper_size_list li:eq(0)').attr('data-width'));
      paper_size_height = parseInt($(unique_id).find('.js_paper_size_list li:eq(0)').attr('data-height'));
      paper_size_title = $(unique_id).find('.js_paper_size_list li:eq(0)').attr('data-paper-title');
    } else {
      paper_size_width = parseInt($(paper_size_input).attr('data-a3-width'));
      paper_size_height = parseInt($(paper_size_input).attr('data-a3-height'));
      paper_size_title = $(paper_size_input).attr('data-title');
    }
  }

  let paper_count_on_one_paper;
  let product_count_to_paper_portrait_orientation;
  let product_count_to_paper_album_orientation
  if (orientation === 'no') {
    // Количество изделий на одном листе бумаги при портретной ориентации
    product_count_to_paper_portrait_orientation = (Math.floor((paper_size_width - 5) / (product_width_val + 5))) * (Math.floor((paper_size_height - 5) / (product_height_val + 5)));
    // Количество изделий на одном листе бумаги при альбомной ориентации
    product_count_to_paper_album_orientation = (Math.floor((paper_size_width - 5) / (product_height_val + 5))) * (Math.floor((paper_size_height - 5) / (product_width_val + 5)));
  } else {
    let orientation_val = parseInt($(unique_id).find('.js_orientation').attr('data-number'));
    if (plus_fold === 'plus_fold') {
      let inner_sheet_count = parseInt($(unique_id).find('.js_inner_sheet_count_current_input').val()) || 0;
      let colored_sheet_count = parseInt($(unique_id).find('.js_colored_sheet_count_current_input').val()) || 0;
      let add_value = Math.round((inner_sheet_count + colored_sheet_count) / 18);
      if (orientation_val === 0) {
        // Количество изделий на одном листе бумаги при портретной ориентации
        product_count_to_paper_portrait_orientation = (Math.floor((paper_size_width - 5) / ((product_width_val * 2) + add_value + 5))) * (Math.floor((paper_size_height - 5) / (product_height_val + 5)));
        // Количество изделий на одном листе бумаги при альбомной ориентации
        product_count_to_paper_album_orientation = (Math.floor((paper_size_width - 5) / (product_height_val + 5))) * (Math.floor((paper_size_height - 5) / ((product_width_val * 2) + add_value + 5)));
      } else {
        // Количество изделий на одном листе бумаги при портретной ориентации
        product_count_to_paper_portrait_orientation = (Math.floor((paper_size_width - 5) / (product_width_val + 5))) * (Math.floor((paper_size_height - 5) / ((product_height_val * 2) + add_value + 5)));
        // Количество изделий на одном листе бумаги при альбомной ориентации
        product_count_to_paper_album_orientation = (Math.floor((paper_size_width - 5) / ((product_height_val * 2) + add_value + 5))) * (Math.floor((paper_size_height - 5) / (product_width_val + 5)));
      }
    } else {
      if (orientation_val === 0) {
        // Количество изделий на одном листе бумаги при портретной ориентации
        product_count_to_paper_portrait_orientation = (Math.floor((paper_size_width - 5) / ((product_width_val * 2) + 5))) * (Math.floor((paper_size_height - 5) / (product_height_val + 5)));
        // Количество изделий на одном листе бумаги при альбомной ориентации
        product_count_to_paper_album_orientation = (Math.floor((paper_size_width - 5) / (product_height_val + 5))) * (Math.floor((paper_size_height - 5) / ((product_width_val * 2) + 5)));
      } else {
        // Количество изделий на одном листе бумаги при портретной ориентации
        product_count_to_paper_portrait_orientation = (Math.floor((paper_size_width - 5) / (product_width_val + 5))) * (Math.floor((paper_size_height - 5) / ((product_height_val * 2) + 5)));
        // Количество изделий на одном листе бумаги при альбомной ориентации
        product_count_to_paper_album_orientation = (Math.floor((paper_size_width - 5) / ((product_height_val * 2) + 5))) * (Math.floor((paper_size_height - 5) / (product_width_val + 5)));
      }
    }
  }
  paper_count_on_one_paper = Math.max(product_count_to_paper_portrait_orientation, product_count_to_paper_album_orientation);


  return new Map([['count', paper_count_on_one_paper], ['title', paper_size_title]]);
}

/***** End Количество изделий на одном листе бумаги *****/


/***** Start Нужное количество листов бумаги с учетом кратности *****/
function get_papers_count(unique_id, current_circulation, count_products_per_paper, current_block = '', divider = 1, sheet_count = 1) {
  // Определяем идентификатор блока
  let block = getCurrentBlockId(current_block);
  // Кратность бумаги
  let paper_type_aliquot = parseInt($(unique_id).find('.js_' + block + 'paper_type_current_input').attr('data-aliquot'));
  // Количество листов бумаги без учета кратности
  let printed_page_count = Math.max(((current_circulation * sheet_count) / divider) / count_products_per_paper);
  // Количество листов бумаги с учетом кратности
  let aliquot_page_count = Math.ceil(printed_page_count / paper_type_aliquot) * paper_type_aliquot;

  // Выбираем большее
  return Math.max(printed_page_count, aliquot_page_count);
}

/***** End Нужное количество листов бумаги с учетом кратности *****/


/***** Start Выбираем размер бумаги в соответствии с шириной и высотой изделия *****/
function set_paper_size(unique_id, need_a3 = 'yes', orientation = 'no', current_block = '') {
  // Зависимости для текущего калькулятора
  let data = get_data(unique_id);

  // Размеры стандартного листа SRA3 с вычетом 10 мм
  let default_paper_width = 310;
  let default_paper_height = 440;

  // Определяем нужные элементы страницы
  let paper_size_input = $(unique_id).find('.js_paper_size_current_input');
  let paper_sizes_list = $(unique_id).find('.js_paper_size_list');

  // Размеры изделия
  let product_width = $(unique_id).find('.js_custom_product_width');
  let product_height = $(unique_id).find('.js_custom_product_height');
  let product_width_val = parseInt($(product_width).val());
  let product_height_val = parseInt($(product_height).val());

  if (orientation === '0') {
    product_width_val = product_width_val * 2;
  } else if (orientation === '1') {
    product_height_val = product_height_val * 2;
  }


  let large_value_from_product_width_or_height = Math.max(product_width_val, product_height_val);
  let large_value_from_paper_width_or_height = Math.max(default_paper_width, default_paper_height);
  let smaller_value_from_paper_width_or_height = Math.min(default_paper_width, default_paper_height);
  let new_paper_size_height, new_paper_size_width, new_paper_size_value, new_paper_size_id, new_paper_size_number,
    new_paper_size_title;
  if (large_value_from_product_width_or_height > large_value_from_paper_width_or_height || ((product_width_val > smaller_value_from_paper_width_or_height) && (product_height_val > smaller_value_from_paper_width_or_height))) {
    $(paper_size_input).attr('data-a3-status', 'no');

    new_paper_size_height = parseInt(paper_sizes_list[0]['children'][1]['dataset']['height']);
    new_paper_size_width = parseInt(paper_sizes_list[0]['children'][1]['dataset']['width']);
    new_paper_size_value = paper_sizes_list[0]['children'][1]['dataset']['value'];
    new_paper_size_id = paper_sizes_list[0]['children'][1]['dataset']['id'];
    new_paper_size_number = paper_sizes_list[0]['children'][1]['dataset']['number'];
    new_paper_size_title = paper_sizes_list[0]['children'][1]['dataset']['paperTitle'];
    if ($(unique_id).attr('data-paper-type') === '1') {
      if (document.querySelector('.stpl_info_wrap_change')) {
        let prompt_block = document.querySelector('.stpl_info_wrap_change');
        const prompt__txt_mb = document.querySelector(".calculator__field__prompt__txt_mb");
        $(prompt_block).show();
        let windows_width = document.body.offsetWidth;
        let prompt_txt_block = $(unique_id).find('.stpl_info_wrap_change .calculator__field__prompt__txt');
        let prompt_icon_block = $(unique_id).find('.stpl_info_wrap_change .calculator__field__prompt__icon');
        if (windows_width < 1000) {
          //$(prompt_block).trigger('click');


          //prompt__txt_mb.innerHTML = prompt_block.querySelector('.calculator__field__prompt__txt').innerHTML;
          //$(prompt_block).find('.calculator__field__prompt__icon').trigger('click');
          //$(prompt__txt_mb).addClass('calculator__field__prompt__txt_active');
          // prompt__txt_mb.style.top = $(prompt_block).find('.calculator__field__prompt__icon').offset().top + 20 + 'px';
          //prompt_block.querySelector('.calculator__field__prompt__icon').classList.add('calculator__field__prompt__icon_active')
        } else {
          $(prompt_txt_block).addClass('calculator__field__prompt__txt_active');
          $(prompt_icon_block).addClass('calculator__field__prompt__icon_active');
          setTimeout(function () {
            $(prompt_icon_block).removeClass('calculator__field__prompt__icon_active');
            $(prompt_txt_block).removeClass('calculator__field__prompt__txt_active');
          }, 5000);
          // $(document).mouseup(function (e) {
          //     let container = $(unique_id).find('.stpl_info_wrap_change .calculator__field__prompt__txt');
          //     if (container.has(e.target).length === 0){
          //         $(prompt_icon_block).removeClass('calculator__field__prompt__icon_active');
          //         $(prompt_txt_block).removeClass('calculator__field__prompt__txt_active');
          //     }
          // });
        }
      }

      if ($(unique_id).find('.js_catalog_tabs').attr('data-type') === 'common') {
        let modules = $(unique_id).find('.js_catalog_tabs').data('modules');
        for (let i = 0; i < modules.length; i++) {
          let title = modules[i]['title'];
          updatePaperType(unique_id, data[1]['paper_type'], title);
          updateLaminationFront(unique_id, data[1]['lamination_front'], title);
          updateLaminationBack(unique_id, data[1]['lamination_back'], title);
        }
      } else if ($(unique_id).find('.js_catalog_tabs').attr('data-type') === 'unique') {
        let modules = $(unique_id).find('.js_catalog_tabs').data('modules');
        for (let i = 0; i < modules.length; i++) {
          let title = modules[i]['title'];
          updatePaperType(unique_id, data[1]['modules'][i]['paper_type'], title);
          updateLaminationFront(unique_id, data[1]['modules'][i]['lamination_front'], title);
          updateLaminationBack(unique_id, data[1]['modules'][i]['lamination_back'], title);
        }
      } else if ($(unique_id).find('.js_catalog_tabs').attr('data-type') === 'single') {
        let modules = $(unique_id).find('.js_catalog_tabs').data('modules');
        let title = modules[1]['title'];
        updatePaperType(unique_id, data[1]['modules'][1]['paper_type'], title);
        updateLaminationFront(unique_id, data[1]['modules'][1]['lamination_front'], title);
      } else {
        updatePaperType(unique_id, data[1]['paper_type']);
        updateLaminationFront(unique_id, data[1]['lamination_front']);
        updateLaminationBack(unique_id, data[1]['lamination_back']);
      }
      $(unique_id).attr('data-paper-type', '2');
    }
  } else {
    new_paper_size_height = parseInt(paper_sizes_list[0]['children'][0]['dataset']['height']);
    new_paper_size_width = parseInt(paper_sizes_list[0]['children'][0]['dataset']['width']);
    new_paper_size_value = paper_sizes_list[0]['children'][0]['dataset']['value'];
    new_paper_size_id = paper_sizes_list[0]['children'][0]['dataset']['id'];
    new_paper_size_number = paper_sizes_list[0]['children'][0]['dataset']['number'];
    new_paper_size_title = paper_sizes_list[0]['children'][0]['dataset']['paperTitle'];

    if ($(unique_id).attr('data-paper-type') === '2') {
      if ($(unique_id).find('.js_catalog_tabs').attr('data-type') === 'common') {
        let modules = $(unique_id).find('.js_catalog_tabs').data('modules');
        for (let i = 0; i < modules.length; i++) {
          let title = modules[i]['title'];
          updatePaperType(unique_id, data[0]['paper_type'], title);
          updateLaminationFront(unique_id, data[0]['lamination_front'], title);
          updateLaminationBack(unique_id, data[0]['lamination_back'], title);
        }
      } else if ($(unique_id).find('.js_catalog_tabs').attr('data-type') === 'unique') {
        let modules = $(unique_id).find('.js_catalog_tabs').data('modules');
        for (let i = 0; i < modules.length; i++) {
          let title = modules[i]['title'];
          updatePaperType(unique_id, data[0]['modules'][i]['paper_type'], title);
          updateLaminationFront(unique_id, data[0]['modules'][i]['lamination_front'], title);
          updateLaminationBack(unique_id, data[0]['modules'][i]['lamination_back'], title);
        }
      } else if ($(unique_id).find('.js_catalog_tabs').attr('data-type') === 'single') {
        let modules = $(unique_id).find('.js_catalog_tabs').data('modules');
        let title_cover = modules[1]['title'];
        for (let i = 0; i < modules.length; i++) {
          let title = modules[i]['title'];
          updatePaperType(unique_id, data[0]['modules'][i]['paper_type'], title);
        }
        updateLaminationFront(unique_id, data[0]['modules'][1]['lamination_front'], title_cover);
      } else {
        updatePaperType(unique_id, data[0]['paper_type']);
        updateLaminationFront(unique_id, data[0]['lamination_front']);
        updateLaminationBack(unique_id, data[0]['lamination_back']);
      }

      if (document.querySelector('.stpl_info_wrap_change')) {
        let prompt_block = document.querySelector('.stpl_info_wrap_change');
        $(prompt_block).hide();
      }

      $(unique_id).attr('data-paper-type', '1');
    }
  }

  $(paper_size_input).val(new_paper_size_value);
  $(paper_size_input).attr('data-number', new_paper_size_number)
  $(paper_size_input).attr('data-id', new_paper_size_id);
  $(paper_size_input).attr('data-width', new_paper_size_width);
  $(paper_size_input).attr('data-height', new_paper_size_height);
  $(paper_size_input).attr('data-paper-title', new_paper_size_title);

  if (need_a3 !== 'no') {
    check_get_in_product_in_a3(unique_id, product_width_val, product_height_val, current_block);
  }
}

/***** End Выбираем размер бумаги в соответствии с шириной и высотой изделия *****/


/***** Start Определяем помещается ли изделие на листе А3 *****/
function check_get_in_product_in_a3(unique_id, product_width_val, product_height_val, current_block = '') {
  // Определяем идентификатор блока
  let block = getCurrentBlockId(current_block);
  let paper_size_input = $(unique_id).find('.js_paper_size_current_input');
  let lam_front_list = $(unique_id).find('.js_' + block + 'lamination_front_list li');
  let lam_back_list = $(unique_id).find('.js_' + block + 'lamination_back_list li');
  let a3_width = parseInt($(paper_size_input).attr('data-a3-width')) - 10;
  let a3_height = parseInt($(paper_size_input).attr('data-a3-height')) - 10;
  let smaller_value_from_a3_width_or_height = Math.min(a3_width, a3_height);
  let biggest_value_from_a3_width_or_height = Math.max(a3_width, a3_height);
  let smaller_value_from_product_width_or_height = Math.min(product_width_val, product_height_val);
  let biggest_value_from_product_width_or_height = Math.max(product_width_val, product_height_val);
  if (((smaller_value_from_product_width_or_height > smaller_value_from_a3_width_or_height) || (biggest_value_from_product_width_or_height > biggest_value_from_a3_width_or_height)) && $(unique_id).attr('data-paper-type') === '1') {
    let lam_front_input = $(unique_id).find('.js_' + block + 'lamination_front_input');
    let lam_front_input_id = $(lam_front_input).attr('data-id');
    if (special_lam_types.includes(lam_front_input_id)) {
      $(lam_front_input).val(lam_front_list[0]['dataset']['value']);
      $(lam_front_input).attr('data-number', lam_front_list[0]['dataset']['number'])
      $(lam_front_input).attr('data-id', lam_front_list[0]['dataset']['id']);
      $(unique_id).find('.js_' + block + 'lamination_front_list li.custom_select__item_active').removeClass('custom_select__item_active');
      $(unique_id).find(lam_front_list).eq(0).addClass("custom_select__item_active");
      $(unique_id).find('.js_' + block + 'lamination_front_current_title').text(lam_front_list[0]['textContent']);
    }

    $.each(lam_front_list, function (i, e) {
      let lam_id = e['dataset']['id'];
      if (special_lam_types.includes(lam_id)) {
        $(lam_front_list).eq(i).addClass("lam_list_inactive");
      }
    });

    let lam_back_input = $(unique_id).find('.js_' + block + 'lamination_back_input');
    let lam_back_input_id = $(lam_front_input).attr('data-id');
    if (special_lam_types.includes(lam_front_input_id)) {
      $(lam_back_input).val(lam_back_list[0]['dataset']['value']);
      $(lam_back_input).attr('data-number', lam_back_list[0]['dataset']['number'])
      $(lam_back_input).attr('data-id', lam_back_list[0]['dataset']['id']);
      $(unique_id).find('.js_' + block + 'lamination_back_list li.custom_select__item_active').removeClass('custom_select__item_active');
      $(lam_back_list).eq(0).addClass("custom_select__item_active");
      $(unique_id).find('.js_' + block + 'lamination_back_current_title').text(lam_back_list[0]['textContent']);
    }

    $.each(lam_back_list, function (i, e) {
      let lam_id = e['dataset']['id'];
      if (special_lam_types.includes(lam_id)) {
        $(lam_back_list).eq(i).addClass("lam_list_inactive");
      }
    });

    if ($(paper_size_input).attr('data-a3-status') === 'yes') {
      let where_show = $(unique_id).find('.js_prompt_choose_lam_back').attr('data-where');
      let prompt_txt_block = $(unique_id).find('.js_prompt_choose_lam_back .calculator__field__prompt__txt');
      let prompt_icon_block = $(unique_id).find('.js_prompt_choose_lam_back .calculator__field__prompt__icon');

      showPrompt(where_show, 5000, prompt_txt_block, prompt_icon_block);
    }

    $(paper_size_input).attr('data-a3-status', 'no');
    $(unique_id).find('.js_a3_' + current_block).attr('data-a3-status', 'no');
  } else {
    let tabs = $(unique_id).find('.js_catalog_tabs');
    if ($(tabs).attr('data-type') === 'common' && typeof tabs !== 'undefined') {
      let modules = $(tabs).data('modules');
      for (let i = 0; i < modules.length; i++) {
        let title = modules[i]['title'];
        $(unique_id).find('.js_' + title + '_lamination_front_list li').removeClass('lam_list_inactive');
        $(unique_id).find('.js_' + title + '_lamination_back_list li').removeClass('lam_list_inactive');
      }
    } else {
      $(lam_front_list).removeClass('lam_list_inactive');
      $(lam_back_list).removeClass('lam_list_inactive');
    }
  }
}

/***** End Определяем помещается ли изделие на листе А3 *****/


/***** Start Логика работы при выборе плотных значений ламинации *****/
function work_with_some_lam_type(unique_id, input_name, id, number, this_title, current_block = '') {
  // Определяем идентификатор блока
  let block = getCurrentBlockId(current_block);

  let front_part = block + 'lamination_front';
  let back_part = block + 'lamination_back';

  let lam_front_input = $(unique_id).find('.js_' + front_part + '_input');
  let lam_back_input = $(unique_id).find('.js_' + back_part + '_input');
  let paper_size_input = $(unique_id).find('.js_paper_size_current_input');
  if (special_lam_types.includes(id)) {
    if (input_name === front_part) {
      $(unique_id).find('.js_' + back_part + '_list li.custom_select__item_active').removeClass('custom_select__item_active');
      $(unique_id).find('.js_' + back_part + '_list li').each(function () {
        if ($(this).attr('data-id') == id) {
          $(this).addClass('custom_select__item_active');
        }
      });
      $(lam_back_input).attr('data-number', number);
      $(lam_back_input).attr('data-id', id);
      $(lam_back_input).attr('value', id);
      $(unique_id).find('.js_' + back_part + '_current_title').text(this_title);
    } else {
      $(unique_id).find('.js_' + front_part + '_list li.custom_select__item_active').removeClass('custom_select__item_active');
      $(unique_id).find('.js_' + front_part + '_list li').each(function () {
        if ($(this).attr('data-id') == id) {
          $(this).addClass('custom_select__item_active');
        }
      });
      $(lam_front_input).attr('data-number', number);
      $(lam_front_input).attr('data-id', id);
      $(lam_front_input).attr('value', id);
      $(unique_id).find('.js_' + front_part + '_current_title').text(this_title);
    }

    $(paper_size_input).attr('data-a3-status', 'yes');
    if ($(unique_id).find('.js_a3_' + current_block).attr('data-a3-status')) {
      $(unique_id).find('.js_a3_' + current_block).attr('data-a3-status', 'yes');
    }
  } else {
    let lam_back_id = $(lam_back_input).attr('data-id');
    let lam_front_id = $(lam_front_input).attr('data-id');
    let default_lam_id = 455;
    if (input_name === front_part && special_lam_types.includes(lam_back_id)) {
      $(unique_id).find('.js_' + back_part + '_list li.custom_select__item_active').removeClass('custom_select__item_active');
      $(unique_id).find('.js_' + back_part + '_list li').each(function () {
        if ($(this).attr('data-id') == default_lam_id) {
          $(this).addClass('custom_select__item_active');
          $(lam_back_input).attr('data-number', $(this).attr('data-number'));
          $(lam_back_input).attr('data-id', $(this).attr('data-id'));
          $(lam_back_input).attr('value', $(this).attr('data-value'));
          $(unique_id).find('.js_' + back_part + '_current_title').text($(this).text());
        }
      });
    } else if (input_name === back_part && special_lam_types.includes(lam_front_id)) {
      $(unique_id).find('.js_' + front_part + '_list li.custom_select__item_active').removeClass('custom_select__item_active');
      $(unique_id).find('.js_' + front_part + '_list li').each(function () {
        if ($(this).attr('data-id') == default_lam_id) {
          $(this).addClass('custom_select__item_active');
          $(lam_front_input).attr('data-number', $(this).attr('data-number'));
          $(lam_front_input).attr('data-id', $(this).attr('data-id'));
          $(lam_front_input).attr('value', $(this).attr('data-value'));
          $(unique_id).find('.js_' + front_part + '_current_title').text($(this).text());
        }
      });
    }

    $(paper_size_input).attr('data-a3-status', 'no');
    if ($(unique_id).find('.js_a3_' + current_block).attr('data-a3-status')) {
      $(unique_id).find('.js_a3_' + current_block).attr('data-a3-status', 'no');
    }
  }
}

/***** End Логика работы при выборе плотных значений ламинации *****/


/***** Start Калькулятор. Стоимость ламинации *****/
function laminationCalc(paper_count, id) {
  // Массив с нужным типом ламинации
  let arr = lamination_data[id];
  let sum;
  if (paper_count === 0 || !paper_count) {
    // Если количество листов равно 0, стоимость ламинации также равно 0
    sum = 0;
  } else {
    let price_front;
    for (let i = 0; i < arr.length; i++) {
      let from = parseInt(arr[i]['from_num']);
      let to = parseInt(arr[i]['to_num']);
      let price = parseFloat(arr[i]['price']);
      // Если количество листов входит в данный интервал, берем цену и прирываем цикл
      if (paper_count >= from && paper_count <= to) {
        price_front = price;
        break;
      }
    }
    sum = paper_count * price_front;
  }

  return sum;
}

/***** End Калькулятор. Стоимость ламинации *****/


/***** Start Калькулятор. Стоимость печати *****/
function printCalc(paper_count, id) {
  let arr = print_data[id];
  let sum;
  if (paper_count === 0 || !paper_count) {
    // Если количество листов равно 0, стоимость печати также равно 0
    sum = 0;
  } else {
    let price_front;
    for (let i = 0; i < arr.length; i++) {
      let from = parseInt(arr[i]['from_num']);
      let to = parseInt(arr[i]['to_num']);
      let price = parseFloat(arr[i]['price']);
      // Если количество листов входит в данный интервал, берем цену и прирываем цикл
      if (paper_count >= from && paper_count <= to) {
        price_front = price;
        break;
      }
    }
    sum = paper_count * price_front;
  }

  return sum;
}

/***** End Калькулятор. Стоимость печати *****/


/***** Start Калькулятор. Стоимость печати *****/
function largePrintCalc(area, arr) {
  let sum;
  if (area === 0 || !area) {
    // Если количество листов равно 0, стоимость печати также равно 0
    sum = 0;
  } else {
    let price_front;
    for (let i = 0; i < arr.length; i++) {
      let from = parseFloat(arr[i]['from_num']);
      let to = parseFloat(arr[i]['to_num']);
      let price = parseFloat(arr[i]['price']);
      // Если количество листов входит в данный интервал, берем цену и прирываем цикл
      if (area >= from && area <= to) {
        price_front = price;
        break;
      }
    }
    sum = area * price_front;
  }

  return sum;
}

/***** End Калькулятор. Стоимость печати *****/


/***** Start Калькулятор. Стоимость бумаги *****/
function paperCalc(unique_id, paper_count, current_block = '') {
  // Определяем идентификатор блока
  let block = getCurrentBlockId(current_block);

  // Определяем цену листа бумаги
  let paper_price = parseFloat($(unique_id).find('.js_' + block + 'paper_weight_current_input').attr('data-price'));

  let sum;
  if (paper_count === 0 || !paper_count) {
    // Если количество листов равно 0, стоимость печати также равно 0
    sum = 0;
  } else {
    sum = paper_count * paper_price;
  }

  return sum;
}

/***** End Калькулятор. Стоимость бумаги *****/


/***** Start Калькулятор. Стоимость послепечатных работ без условий *****/
function afterPrintWorkCalc(count_items, post_print_id, increase_min_sum = 1) {
  let sum;
  if (count_items === 0 || !count_items) {
    // Если количество листов или тираж равно 0, стоимость работы также равно 0
    sum = 0;
  } else {
    let arr = post_print_price[post_print_id];
    let conditions_arr;
    for (let i = 0; i < arr.length; i++) {
      let from = parseInt(arr[i]['from_num']);
      let to = parseInt(arr[i]['to_num']);
      let conditions = arr[i]['conditions'];
      // Если количество листов входит в данный интервал, берем цену и прирываем цикл
      if (count_items >= from && count_items <= to) {
        conditions_arr = conditions;
        break;
      }
    }

    let min_sum = parseInt(conditions_arr[0]['min_sum']);
    if (min_sum) {
      min_sum = min_sum * increase_min_sum;
    } else {
      min_sum = 0;
    }
    let one_item_price = parseFloat(conditions_arr[0]['price']);
    let total_sum = count_items * one_item_price;
    if (min_sum && min_sum != '' && min_sum != 0) {
      if (total_sum > min_sum) {
        sum = total_sum;
      } else {
        sum = min_sum;
      }
    } else {
      sum = total_sum;
    }
  }

  return sum;
}

/***** End Калькулятор. Стоимость послепечатных работ без условий *****/


/***** Start Калькулятор. Общая сумма с округлением *****/
function totalSumCalcWithRound(total_sum, paper_count) {
  let total;
  if (paper_count > 0) {
    let total_common_new = (total_sum / 1.2).toFixed(2);
    let stringLength = total_common_new.length;
    let last_symbol = total_common_new.charAt(stringLength - 1);
    let pre_last_symbol = total_common_new.charAt(stringLength - 2);
    let pre_pre_last_symbol = total_common_new.charAt(stringLength - 4);
    let pre_pre_pre_last_symbol = total_common_new.charAt(stringLength - 5);
    let last_symbol_new;
    if (last_symbol === '1' || last_symbol === '2' || last_symbol === '8' || last_symbol === '9' || last_symbol === '0') {
      last_symbol_new = 0;
    } else {
      last_symbol_new = '5';
    }
    if ((last_symbol === '8' || last_symbol === '9') && pre_last_symbol !== '9') {
      total_common_new = total_common_new.substring(0, stringLength - 2) + (parseInt(pre_last_symbol) + 1) + last_symbol_new;
    } else if ((last_symbol === '8' || last_symbol === '9') && pre_last_symbol === '9' && pre_pre_last_symbol === '9') {
      total_common_new = total_common_new.substring(0, stringLength - 5) + (parseInt(pre_pre_pre_last_symbol) + 1) + '0.' + 0 + last_symbol_new;
    } else if ((last_symbol === '8' || last_symbol === '9') && pre_last_symbol === '9') {
      total_common_new = total_common_new.substring(0, stringLength - 4) + (parseInt(pre_pre_last_symbol) + 1) + '.' + 0 + last_symbol_new;
    } else {
      total_common_new = total_common_new.substring(0, stringLength - 1) + last_symbol_new;
    }
    total = parseFloat(total_common_new) * 1.2;
  } else {
    total = 0;
  }

  return total;
}

/***** End Калькулятор. Общая сумма с округлением *****/


/***** Start Валидация. Разрешается вводить определенное количество символов, которые могут быть только числами *****/
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

/***** End Валидация. Разрешается вводить определенное количество символов, которые могут быть только числами *****/


/***** Start Валидация. Разрешается вводить числа только с определенного интервала *****/
function input_data_validation(element, min_value = 1, max_value, listener = 'input paste') {
  $(element).on(listener, function () {
    let total_number = $(element).val();
    let first_symbol = total_number.charAt(0);
    // Если первый символ равняется 0, меняем его на 1
    if (first_symbol == 0) {
      $(element).val(total_number.replace('0', '1'));
    }

    // Если значение поля меньше минимального разрешенного
    if (total_number < min_value && !total_number == '') {
      $(element).val(min_value);
    }

    // Если значение поля больше максимального разрешенного
    if (total_number > max_value) {
      $(element).val(max_value);
    }
  });
}

function input_data_validation_2(element, min_value = 1, max_value) {
  let total_number = $(element).val();
  let first_symbol = total_number.charAt(0);
  // Если первый символ равняется 0, меняем его на 1
  if (first_symbol == 0) {
    $(element).val(total_number.replace('0', '1'));
  }

  // Если значение поля меньше минимального разрешенного
  if (total_number < min_value && !total_number == '') {
    $(element).val(min_value);
  }

  // Если значение поля больше максимального разрешенного
  if (total_number > max_value) {
    $(element).val(max_value);
  }
}

/***** End Валидация. Разрешается вводить числа только с определенного интервала *****/


/***** Start Валидация поля ширины и высоты изделия простая *****/
function validation_width_height_inputs_simple(unique_id, current_obj, width_input, height_input, only_sra3 = 'no') {
  let min_max_value;
  let max_max_value;
  let width_input_class = width_input[0]['classList'][1];
  let height_input_class = height_input[0]['classList'][1];
  if (only_sra3 === 'yes') {
    // Размеры стандартного листа с вычетом 10 мм
    min_max_value = 310;
    max_max_value = 440;
  } else {
    // Размеры баннерного листа с вычетом 10 мм
    min_max_value = 320;
    max_max_value = 690;
  }

  // Клас текущего поля
  let current_class = current_obj.target.classList[1];

  // Значения ширины
  let min_value_in_width_input = parseInt($(width_input).data('min'));
  let width_input_val = parseInt($(width_input).val());

  // Значения высоты
  let min_value_in_height_input = parseInt($(height_input).data('min'));
  let height_input_val = parseInt($(height_input).val());

  // Значение текущего поля
  let current_value = $(current_obj.currentTarget).val();

  let isWidthFocused = $(document.activeElement).attr('name') === $(width_input).attr('name')
  let isHeightFocused = $(document.activeElement).attr('name') === $(height_input).attr('name')

  // Валидация поля ширины
  if (current_class === width_input_class) {
    if (current_value > min_max_value && height_input_val <= min_max_value) {
      if (current_value > max_max_value) {
        if(!isWidthFocused) {
          $(width_input).val(max_max_value);
        } else {
          return false;
        }
      }
    } else if (current_value >= min_max_value && height_input_val > min_max_value) {
      if (current_value > min_max_value) {
        if(!isWidthFocused) {
          $(width_input).val(min_max_value);
        } else {
          return false;
        }
      }
    } else {
      if (current_value > max_max_value) {
        if(!isWidthFocused) {
          $(width_input).val(max_max_value);
        } else {
          return false;
        }
      }
    }

    if (current_value < min_value_in_width_input || current_value === null) {
      if(!isWidthFocused) {
        $(width_input).val(min_value_in_width_input);
      } else {
        return false;
      }
    }
  }

  // Валидация поля высоты
  if (current_class === height_input_class) {
    if (current_value > min_max_value && width_input_val <= min_max_value) {
      if (current_value > max_max_value) {
        if(!isHeightFocused) {
          $(height_input).val(max_max_value);
        } else {
          return false;
        }
      }
    } else if (current_value >= min_max_value && width_input_val > min_max_value) {
      if (current_value > min_max_value) {
        if(!isHeightFocused) {
          $(height_input).val(min_max_value);
        } else {
          return false;
        }
      }
    } else {
      if (current_value > max_max_value) {
        if(!isHeightFocused) {
          $(height_input).val(max_max_value);
        } else {
          return false;
        }
      }
    }

    if (current_value < min_value_in_height_input || current_value == '') {
      if(!isHeightFocused) {
        $(height_input).val(min_value_in_height_input);
      } else {
        return false;
      }
    }

  }

  if (document.querySelector('.js_flip_block_product_size_list')) {
    let flip_block_product_size_list = $(unique_id).find('.js_flip_block_product_size_list li.custom_select__item_active');
    $(flip_block_product_size_list).removeClass('custom_select__item_active');
    let flip_block_paper_size_input = $(unique_id).find('.js_paper_size_current_input');
    let flip_block_product_size_title = $(flip_block_paper_size_input).attr('data-custom-product-size-title');
    $(unique_id).find('.js_flip_block_product_size_title').text(flip_block_product_size_title);
    $(unique_id).find('.js_flip_block_product_size_current_input').val(flip_block_product_size_title);
  }

  $(unique_id).find('.js_product_size_list li.custom_select__item_active').removeClass('custom_select__item_active');
  let paper_size_input = $(unique_id).find('.js_paper_size_current_input');
  let product_size_title = $(unique_id).find(paper_size_input).attr('data-custom-product-size-title');
  $(unique_id).find('.js_product_size_title').text(product_size_title);
  $(unique_id).find('.js_product_size_current_input').val(product_size_title);

  // Нужно ли переключатся на лист А3
  let need_a3_value = $(paper_size_input).attr('data-need-a3');

  let tabs = $(unique_id).find('.js_catalog_tabs');

  if (typeof tabs !== 'undefined' && only_sra3 === 'yes' && tabs.length > 0) {
    // Размеры изделия
    let product_width = $(unique_id).find('.js_custom_product_width');
    let product_height = $(unique_id).find('.js_custom_product_height');
    let product_width_val = parseInt($(product_width).val());
    let product_height_val = parseInt($(product_height).val());
    let modules = $(tabs).data('modules');
    for (let i = 0; i < modules.length; i++) {
      let title = modules[i]['title'];
      check_get_in_product_in_a3(unique_id, product_width_val, product_height_val, title);
    }
  } else {
    set_paper_size(unique_id, need_a3_value);
  }
}

let validation_attr = $('.js_total_sum_block').attr('data-validation-sizes');
// можно вводить не более 3 символов и только числа
if (document.querySelector('.js_custom_product_width') && validation_attr !== 'custom') {
  setInputFilter(document.querySelector('.js_custom_product_width'), function (value) {
    return /^\d{0,3}$/.test(value); // разрешенно вводить только цифры, не больше 3
  });
}

// можно вводить не более 3 символов и только числа
if (document.querySelector('.js_custom_product_height') && validation_attr !== 'custom') {
  setInputFilter(document.querySelector('.js_custom_product_height'), function (value) {
    return /^\d{0,3}$/.test(value); // разрешенно вводить только цифры, не больше 3
  });
}

/***** End Валидация поля ширины и высоты изделия простая *****/


/***** Start Валидация поля ширины и высоты изделия сложная *****/
function validation_width_height_inputs_with_orientation(unique_id, current_obj, width_input, height_input, only_sra3 = 'no') {
  let orientation_number = $(unique_id).find('.js_orientation').attr('data-number');
  let min_max_value;
  let max_max_value;
  let width_input_class = width_input[0]['classList'][1];
  let height_input_class = height_input[0]['classList'][1];

  if ($(unique_id).find('.js_total_sum_block').attr('data-need-multiply') !== 'no') {
    min_max_value = 320;
    max_max_value = 345;
  } else if ($(unique_id).find('.js_total_sum_block').attr('data-need-multiply') === 'no') {
    min_max_value = 310;
    max_max_value = 320;
  } else if ($(unique_id).find('.js_total_sum_block').attr('data-only-sra3') === 'yes') {
    // Размеры стандартного листа с вычетом 10 мм
    min_max_value = 310;
    max_max_value = 440;
  } else {
    // Размеры баннерного листа с вычетом 10 мм
    min_max_value = 320;
    max_max_value = 690;
  }


  // Клас текущего поля
  let current_class = current_obj.target.classList[1];

  // Значения ширины
  let min_value_in_width_input = parseInt($(width_input).attr('data-min'));
  let width_input_val = parseInt($(width_input).val()) || null;

  // Значения высоты
  let min_value_in_height_input = parseInt($(height_input).attr('data-min'));
  let height_input_val = parseInt($(height_input).val()) || null;

  // Значение текущего поля
  let current_value = parseInt($(current_obj.currentTarget).val()) || null;

  let isWidthFocused = $(document.activeElement).attr('name') === $(width_input).attr('name')
  let isHeightFocused = $(document.activeElement).attr('name') === $(height_input).attr('name')

  console.log(min_value_in_height_input, current_value)

  // Валидация поля ширины
  if (current_class === width_input_class) {
    if ($(unique_id).find('.js_total_sum_block').attr('data-need-multiply') !== 'no') {
      if (orientation_number === '0') {
        if (current_value > max_max_value) {
          if(!isWidthFocused) {
            $(width_input).val(max_max_value);
          } else {
            return false;
          }
        }
      } else if (orientation_number === '1') {
        if (current_value > min_max_value) {
          if(!isWidthFocused) {
            $(width_input).val(min_max_value);
          } else {
            return false;
          }
        }
      }

      if (current_value < min_value_in_width_input || current_value === null) {
        if(!isWidthFocused) {
          $(width_input).val(min_value_in_width_input);
        } else {
          return false;
        }
      }
    } else {
      if (current_value > min_max_value && height_input_val <= min_max_value) {
        if (current_value > max_max_value) {
          if(!isWidthFocused) {
            $(width_input).val(max_max_value);
          } else {
            return false;
          }
        }
      } else if (current_value >= min_max_value && height_input_val > min_max_value) {
        if (current_value > min_max_value) {
          if(!isWidthFocused) {
            $(width_input).val(min_max_value);
          } else {
            return false;
          }
        }
      } else {
        if (current_value > max_max_value) {
          if(!isWidthFocused) {
            $(width_input).val(max_max_value);
          } else {
            return false;
          }
        }
      }

      if (current_value < min_value_in_width_input || current_value === null) {
        if(!isWidthFocused) {
          $(width_input).val(min_value_in_width_input);
        } else {
          return false;
        }
      }
    }
  }

  // Валидация поля высоты
  if (current_class === height_input_class) {
    if ($(unique_id).find('.js_total_sum_block').attr('data-need-multiply') !== 'no') {
      if (orientation_number === '0') {
        if (current_value > min_max_value) {
          if(!isHeightFocused) {
            $(height_input).val(min_max_value);
          } else {
            return false;
          }
        }
      } else if (orientation_number === '1') {
        if (current_value > max_max_value) {
          if(!isHeightFocused) {
            $(height_input).val(max_max_value);
          } else {
            return false;
          }
        }
      }

      if (current_value > min_max_value && width_input_val <= min_max_value) {
        if (current_value > max_max_value) {
          if(!isHeightFocused) {
            $(height_input).val(max_max_value);
          } else {
            return false;
          }
        }
      } else if (current_value >= min_max_value && width_input_val > min_max_value) {
        if (current_value > min_max_value) {
          if(!isHeightFocused) {
            $(height_input).val(min_max_value);
          } else {
            return false;
          }
        }
      } else {
        if (current_value > max_max_value) {
          if(!isHeightFocused) {
            $(height_input).val(max_max_value);
          } else {
            return false;
          }
        }
      }

      if (current_value < min_value_in_height_input || current_value === null) {
        if(!isHeightFocused) {
          $(height_input).val(min_value_in_height_input);
        } else {
          return false;
        }
      }
    } else {
      if (current_value > min_max_value && width_input_val <= min_max_value) {
        if (current_value > max_max_value) {
          if(!isHeightFocused) {
            $(height_input).val(max_max_value);
          } else {
            return false;
          }
        }
      } else if (current_value >= min_max_value && width_input_val > min_max_value) {
        if (current_value > min_max_value) {
          if(!isHeightFocused) {
            $(height_input).val(min_max_value);
          } else {
            return false;
          }
        }
      } else {
        if (current_value > max_max_value) {
          if(!isHeightFocused) {
            $(height_input).val(max_max_value);
          } else {
            return false;
          }
        }
      }

      if (current_value < min_value_in_height_input || current_value == '') {
        if(!isHeightFocused) {
          $(height_input).val(min_value_in_height_input);
        } else {
          return false;
        }
      }
    }
  }

  $(unique_id).find('.js_product_size_list li.custom_select__item_active').removeClass('custom_select__item_active');
  let paper_size_input = $(unique_id).find('.js_paper_size_current_input');
  let product_size_title = $(unique_id).find(paper_size_input).attr('data-custom-product-size-title');
  $(unique_id).find('.js_product_size_title').text(product_size_title);
  $(unique_id).find('.js_product_size_current_input').val(product_size_title);

  // Нужно ли переключатся на лист А3
  let need_a3_value = $(paper_size_input).attr('data-need-a3');

  let tabs = $(unique_id).find('.js_catalog_tabs');

  if (typeof tabs !== 'undefined' && only_sra3 !== 'yes') {
    set_paper_size(unique_id, need_a3_value, orientation_number);
  } else {
    if ($(unique_id).find('.js_total_sum_block').attr('data-only-sra3') === 'yes') {
      // Размеры изделия
      let product_width = $(unique_id).find('.js_custom_product_width');
      let product_height = $(unique_id).find('.js_custom_product_height');
      let product_width_val = parseInt($(product_width).val());
      let product_height_val = parseInt($(product_height).val());
      let modules = $(unique_id).find('.js_catalog_tabs').data('modules');
      for (let i = 0; i < modules.length; i++) {
        let title = modules[i]['title'];
        check_get_in_product_in_a3(unique_id, product_width_val, product_height_val, title);
      }
    } else {
      set_paper_size(unique_id, need_a3_value);
    }
  }
}

/***** End Валидация поля ширины и высоты изделия сложная *****/


/***** Start Текстовка блока сгиб/биговка *****/
function change_text_fold_bend_block(unique_id) {
  let type_bend = $(unique_id).find('.js_paper_weight_current_input').attr('data-type-bend');
  if (type_bend === 'one') {
    $(unique_id).find('.js_fold_bend_label_title').text($(unique_id).find('.js_fold_bend_block').attr('data-fold-title'));
    $(unique_id).find('.js_fold_bend_count_txt').text($('.js_fold_bend_block').attr('data-fold-txt-count'));
  } else {
    $(unique_id).find('.js_fold_bend_label_title').text($(unique_id).find('.js_fold_bend_block').attr('data-bend-title'));
    $(unique_id).find('.js_fold_bend_count_txt').text($(unique_id).find('.js_fold_bend_block').attr('data-bend-txt-count'));
  }
}

/***** End Текстовка блока сгиб/биговка *****/


/***** Start Вывод инфо-подсказки при определенных условиях *****/
function showPrompt(where_show, delay, prompt_txt_block, prompt_icon_block) {
  let windows_width = document.body.offsetWidth;
  if (windows_width < 1000) {
    $(prompt_icon_block).trigger('click');
  } else {
    $(prompt_txt_block).addClass('calculator__field__prompt__txt_active');
    $(prompt_icon_block).addClass('calculator__field__prompt__icon_active');
    setTimeout(function () {
      $(prompt_icon_block).removeClass('calculator__field__prompt__icon_active');
      $(prompt_txt_block).removeClass('calculator__field__prompt__txt_active');
    }, delay);
  }
}

/***** End Вывод инфо-подсказки при определенных условиях *****/

window.addEventListener("DOMContentLoaded", function () {
  $(document).on('input', '.calculator__field__input', function () {
    if(!$(this).hasClass('is-invalid'))
      $(this).trigger('change')
  })
});

//выпадающие списки
const custom_select = Array.from(document.querySelectorAll('.custom_select__current'));
custom_select.forEach((el) => {
  el.addEventListener('click', () => {
    if (el.closest('.custom_select').classList.contains('custom_select_open')) {
      el.closest('.custom_select').classList.remove('custom_select_open');
    } else {
      el.closest('.custom_select').classList.add('custom_select_open');
    }
  })
});


for (const option of document.querySelectorAll(".calculators__select .custom_select__item")) {
  option.addEventListener('click', function () {
    if (!this.classList.contains('custom_select__item_active')) {
      if(this.closest('.custom_select').querySelector('.custom_select__item_active'))
        this.closest('.custom_select').querySelector('.custom_select__item_active').classList.remove('custom_select__item_active');
      this.closest('.custom_select').classList.remove('custom_select_open');
      this.classList.add('custom_select__item_active');
      this.closest('.custom_select').querySelector('.custom_select__current').textContent = this.textContent;
      if (this.closest('.custom_select').querySelector('input')) {
        this.closest('.custom_select').querySelector('input').setAttribute('value', this.getAttribute('data-value'));
        if (this.closest('.custom_select').querySelector('input').getAttribute('name') == 'category') {
          $('.index__form__products .custom_select__list').html('');
          $('.index__form__products .custom_select__current').html($('.index__form__products').attr('data-default'));
        }
      }
    }

  })
}

window.addEventListener('click', function(e) {
  for (const select of document.querySelectorAll('.custom_select')) {
    if (!select.contains(e.target)) {
      select.classList.remove('custom_select_open');
    }
  }
  for (const select of document.querySelectorAll('.nav__order-online__wrapper_auth')) {
    if (!select.contains(e.target)) {
      select.classList.remove('nav__order-online__wrapper_auth');
    }
  }
  for (const select of document.querySelectorAll('.nav__order-online__wrapper_order')) {
    if (!select.contains(e.target)) {
      select.classList.remove('nav__order-online__wrapper_order');
    }
  }
});


if (document.querySelector('.js_form_data_0')) {
  // Уникальный идентификатор формы
  let unique_id = $('.js_form_data_0');
  /***** Start. Получаем массивы *****/
  let data = $(unique_id).data('form');
  let product_sizes = $(unique_id).data('product-sizes');
  /***** End. Получаем массивы *****/

  /***** Start. Действия при клике на селект *****/
  $(unique_id).on('click', '.custom_select__item', function(e) {
    if (!$(this).hasClass('custom_select__item_active')) {
      $(this).closest('.custom_select').find('.custom_select__item').removeClass('custom_select__item_active');
      $(this).closest('.custom_select').removeClass('custom_select_open');
      $(this).addClass('custom_select__item_active');
      $(this).closest('.custom_select').find('.custom_select__current').text($(this).text());
      if ($(this).closest('.custom_select').find('input')) {
        // Вставляем основное значение с пункта списка в инпут
        $(this).closest('.custom_select').find('input').attr('value', $(this).attr('data-value'));

        // Имя инпута
        let input_name = $(this).closest('.custom_select').find('input').attr('name');

        // дата атрибуты number и id
        let number = $(this).attr('data-number');
        let id = $(this).attr('data-id');

        // Вставляем id и number с пункта списка в инпут
        $(this).closest('.custom_select').find('input').attr('data-number', number);
        $(this).closest('.custom_select').find('input').attr('data-id', id);

        // Вставляем стоимость бумаги с пункта списка в инпут
        let paper_price = $(this).attr('data-price');
        if (paper_price) {
          $(this).closest('.custom_select').find('input').attr('data-price', paper_price);
        }

        // Обновляем размер изделия в селекте
        if (input_name === 'product-size') {
          $(unique_id).find('.js_custom_product_width').val(product_sizes[number]['product_size_width']);
          $(unique_id).find('.js_custom_product_height').val(product_sizes[number]['product_size_height']);
          set_paper_size(unique_id);
        }

        // Работа с плотными значениями ламинации
        if (input_name === 'lamination_front' || input_name === 'lamination_back') {
          work_with_some_lam_type(unique_id, input_name, id, number, $(this).text());
        }

        // Обновляем плотность бумаги и цветность печати
        if (input_name === 'paper_type') {
          let paper_size_data_number = $(unique_id).find('.js_paper_size_current_input').attr('data-number');
          let paper_type_aliquot = $(this).attr('data-aliquot');
          $(this).closest('.custom_select').find('input').attr('data-aliquot', paper_type_aliquot);
          // Обновляем плотность бумаги в селекте
          updatePaperWeight(unique_id, data[paper_size_data_number]['paper_type'][number]['paper_weight']);
        } else if (input_name === 'paper_weight') {
          let paper_size_data_number = $(unique_id).find('.js_paper_size_current_input').attr('data-number');
          let paper_type_data_number = $(unique_id).find('.js_paper_type_current_input').attr('data-number');
          // Обновляем цветность печати в селекте
          updateColorPrinting(unique_id, data[paper_size_data_number]['paper_type'][paper_type_data_number]['paper_weight'][number]['color_printing']);
        }

        // запускаем калькулятор
        totalSumCalc_0(unique_id);
      }
    }
  });
  /***** End. Действия при клике на селект *****/

  /***** Start Валидация поля ширины и высоты изделия *****/
  let width_input = $(unique_id).find('.js_custom_product_width');
  let height_input = $(unique_id).find('.js_custom_product_height');
  $(width_input).on('change paste', function(e) {
    validation_width_height_inputs_simple(unique_id, e, width_input, height_input);
    totalSumCalc_0(unique_id);
  });
  $(height_input).on('change paste', function(e) {
    validation_width_height_inputs_simple(unique_id, e, width_input, height_input);
    totalSumCalc_0(unique_id);
  });
  /***** End Валидация поля ширины и высоты изделия *****/

  /***** Start. Запуск функции калькулятора, если изменилось значение тиража или чекбокса *****/
  $(unique_id).find('.js_personal_checkbox').change(function() {
    totalSumCalc_0(unique_id);
  });

  /***** End. Запуск функции калькулятора, если изменилось значение тиража или чекбокса *****/

  /***** Start. Запуск функции калькулятора, если изменилось значение тиража *****/
  $(unique_id).find('.js_circulation').on('input paste', function() {
    let validation_circulation_input = $(unique_id).find('.js_circulation');
    let circulation_val = validation_circulation_input.val();

    if (isNaN(circulation_val)) {
      $(validation_circulation_input).val(circulation_val.replace(/[^\d]/g, ''));
    }
    if ($(unique_id).find('.js_circulation').val().indexOf(".")) {
      $(validation_circulation_input).val($(unique_id).find('.js_circulation').val().replace(".", ""));
    }

    let max_circulation = validation_circulation_input.data('max-circulation');
    if (!max_circulation) {
      max_circulation = 9999;
    }

    input_data_validation_2(validation_circulation_input, 1, max_circulation);

    totalSumCalc_0(unique_id);
  });

  /***** End. Запуск функции калькулятора, если изменилось значение тиража *****/

  /***** Start. Общая сумма *****/
  function totalSumCalc_0(unique_id) {
    // Start. Количество изделий на одном листе бумаги
    let arr_products_count_per_paper = get_products_count_per_paper(unique_id);
    let count_products_per_paper = arr_products_count_per_paper.get('count');
    console.log('Размер бумаги: ' + arr_products_count_per_paper.get('title'));
    console.log('Изделий на одном листе: ' + count_products_per_paper);
    // End. Количество изделий на одном листе бумаги

    // id текущего размера бумаги
    let paper_size_input = $(unique_id).find('.js_paper_size_current_input');
    let paper_size_id = parseInt($(paper_size_input).attr('data-id'));

    // Текущий тираж
    let current_circulation = parseInt($(unique_id).find('.js_circulation').val());

    // Start. Нужное количество листов бумаги для распечатки всего тиража
    let paper_count = get_papers_count(unique_id, current_circulation, count_products_per_paper);
    console.log('Нужное количество листов: ' + paper_count);
    // End. Нужное количество листов бумаги для распечатки всего тиража

    // Start. Стоимость бумаги
    let paper_sum;
    if (paper_size_id === 426) {
      paper_sum = paperCalc(unique_id, paper_count);
    } else {
      paper_sum = paperCalc(unique_id, (paper_count * 2));
    }
    console.log('Стоимость бумаги: ' + paper_sum);
    // End. Стоимость бумаги

    // Start. Стоимость печати
    let print_sum;
    let color_id = parseInt($(unique_id).find('.js_color_printing_current_input').attr('data-id'));
    if (paper_size_id === 426) {
      print_sum = printCalc(paper_count, color_id);
    } else {
      print_sum = printCalc((paper_count * 2), color_id);
    }
    console.log('Стоимость печати: ' + print_sum);
    // End. Стоимость печати

    // Start. Стоимость ламинации
    let lamination_front_sum;
    let lamination_back_sum;
    let lamination_front_id = parseInt($(unique_id).find('.js_lamination_front_input').attr('data-id'));
    let lamination_back_id = parseInt($(unique_id).find('.js_lamination_back_input').attr('data-id'));
    if (lamination_front_id && lamination_back_id) {
      if (paper_size_id === 426) {
        lamination_front_sum = laminationCalc(paper_count, lamination_front_id);
        lamination_back_sum = laminationCalc(paper_count, lamination_back_id);
      } else {
        lamination_front_sum = laminationCalc((paper_count * 2), lamination_front_id);
        lamination_back_sum = laminationCalc((paper_count * 2), lamination_back_id);
      }
    } else {
      lamination_front_sum = 0;
      lamination_back_sum = 0;
    }

    let lamination_sum = lamination_front_sum + lamination_back_sum;
    console.log('Стоимость ламинации: ' + lamination_sum);
    // End. Стоимость ламинации

    // Start. Стоимость порезки
    let cut_id = $(unique_id).find('.js_total_sum_block').attr('data-cut-id')
    let cut_sum = afterPrintWorkCalc(current_circulation, cut_id);
    console.log('Стоимость порезки: ' + cut_sum);
    // End. Стоимость порезки

    // Start. Стоимость персонализации
    let personal_id = $(unique_id).find('.js_total_sum_block').attr('data-personal-id')
    let personal_price_sum_next;
    let personal_checkbox = $(unique_id).find('.js_personal_checkbox');
    if ($(personal_checkbox).is(':checked')) {
      personal_price_sum_next = afterPrintWorkCalc(print_sum, personal_id);
    } else {
      personal_price_sum_next = 0;
    }
    console.log('Стоимость персонализации: ' + personal_price_sum_next);
    // End. Стоимость персонализации

    // Start. Общая сумма с округлением
    let total_common = paper_sum + print_sum + lamination_sum + cut_sum + personal_price_sum_next;
    let total = totalSumCalcWithRound(total_common, paper_count);
    let total_front = total.toFixed(2);
    console.log('Общая сумма: ' + total_front);
    console.log('____________________________');
    // End. Общая сумма с округлением

    // Start. Стоимость одного изделия
    let one_product_cost;
    if (paper_count > 0) {
      one_product_cost = total / current_circulation;
    } else {
      one_product_cost = 0;
    }
    // End. Стоимость одного изделия

    // Start. Выводим данные на фронт
    $(unique_id).find('.js_one_item_cost').text(one_product_cost.toFixed(4));
    $(unique_id).find('input[name="total-sum"]').val(total_front);
    $(unique_id).find('.js_total_sum').text(total_front);
    // End. Выводим данные на фронт

    if (total_front > 0) {
      $(unique_id).find('.calculator__bottom__btn').removeClass('stpl_btn_disabled');
    } else {
      $(unique_id).find('.calculator__bottom__btn').addClass('stpl_btn_disabled');
    }
  }

  /***** End. Общая сумма *****/
}
