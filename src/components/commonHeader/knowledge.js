﻿import './style.css';

export default function($container, withShadow) {
  var $tpl = $('<div>', {
    class: 'commonPageHeader' + (withShadow === false ? '' : ' withShadow'),
  }).append(
    '<a href="/" class="TxtMiddle InlineBlock"><img src="/staticfiles/components/images/mingdao.png" class="TxtMiddle" style="height: 32px;"></a>',
  );
  $container.prepend($tpl);
}
