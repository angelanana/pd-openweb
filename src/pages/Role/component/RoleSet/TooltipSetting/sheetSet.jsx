import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Checkbox, Tooltip, Icon, RadioGroup } from 'ming-ui';
import lookPng from './img/look.png';
import editPng from './img/edit.png';
import delPng from './img/del.png';
const Wrap = styled.div`
  .title {
    font-weight: 400;
  }
  .radioCon {
    &:before {
      content: ' ';
      width: 2px;
      min-height: 100%;
      background: #dddddd;
      border-radius: 1px;
      display: block;
      margin-left: 8px;
    }
    .conRadioGroup {
      padding: 15px 30px;
      .Radio-text {
        font-weight: 600;
      }
    }
  }
  .ming.Radio {
    margin-right: 60px;
  }
`;
const WrapTip = styled.div`
  margin-top: 18px;
  background: #fafafa;
  border-radius: 3px 3px 3px 3px;
  padding: 18px;
  border: 1px solid #e3e3e3;
  position: relative;
  .tipConArrow {
    position: absolute;
    width: 12px;
    height: 12px;
    background: #fafafa;
    border-left: 1px solid #e3e3e3;
    border-top: 1px solid #e3e3e3;
    transform: rotate(45deg);
    left: 118px;
    top: -7px;
  }
`;
function TipsRender(props) {
  const {
    sheet,
    type = 'operation',
    onChange,
    isForPortal,
    extendAttrList,
    extendAttrValue,
    onChangeExtendAttr,
  } = props;
  const { sheetName, userFileds } = sheet;

  if (![20, 30].includes(props.value) || props.disable) {
    return '';
  }

  return (
    <React.Fragment>
      <WrapTip className="tipCon">
        <div className="tipConArrow" />
        <div className="tipContent">
          {_l('%0表中', sheetName)}
          <span className="Bold mLeft3 mRight3 Inline">
            {userFileds
              .filter(o => (type === 'look' ? true : o.userPermission === 2)) //查看=>显示全部；操作=>拥有的
              .map(o => o.name)
              .join(', ')}
          </span>
          {_l('字段包含当前用户的记录')}
          {type !== 'look' && (
            <Tooltip
              text={
                <span>
                  {_l(
                    '成员、部门、组织角色类型的字段，作为“拥有者”的记录，包含多个权限为“拥有者”字段时，权限为“或”关系',
                  )}
                </span>
              }
              popupPlacement="top"
            >
              <i className="icon-info_outline Font16 mLeft6 Gray_bd TxtMiddle" />
            </Tooltip>
          )}
        </div>
      </WrapTip>
      {!isForPortal && (
        <React.Fragment>
          <p className="mBottom0 mTop24 Gray_75">{_l('额外包含以下记录')}</p>
          <div className={'tipItem flexRow alignItemsCenter mTop20'}>
            <Checkbox
              className="InlineBlock "
              checked={props.value === 30}
              onClick={() => {
                onChange(props.value === 30 ? 20 : 30);
              }}
            />
            {type === 'look' ? _l('下属加入的记录') : _l('下属拥有的记录')}
            {type !== 'look' && (
              <Tooltip text={<span>{_l('基于组织的人员汇报关系，下属所拥有的记录')}</span>} popupPlacement="top">
                <i className="icon-info_outline Font16 mLeft6 Gray_bd" />
              </Tooltip>
            )}
          </div>
          {extendAttrList.length !== 0 && (
            <div className="tipExtendAttr flexRow mTop18">
              <div className="left">
                <span className="flexRow alignItemsCenter">
                  <Checkbox
                    className="InlineBlock "
                    checked={extendAttrList.filter(l => extendAttrValue.includes(l.id)).length > 0}
                    clearselected={
                      extendAttrValue.length > 0 &&
                      extendAttrList.filter(l => !extendAttrValue.includes(l.id)).length !== 0
                    }
                    text={_l('匹配用户权限标签的记录')}
                    onClick={value => {
                      if (value) {
                        onChangeExtendAttr([]);
                      } else {
                        onChangeExtendAttr(extendAttrList.map(l => l.id));
                      }
                    }}
                  />
                  <Tooltip
                    text={_l(
                      '可启用的权限标签字段来自于[用户扩展信息]的标签字段。勾选后，可根据[用户扩展信息-人员表]中配置的字段值，查看工作表被关联的字段所属记录。',
                    )}
                  >
                    <Icon icon="workflow_error" className="Gray_bd" />
                  </Tooltip>
                </span>
              </div>
              <div className="right mLeft40" style={{ display: 'flex', gap: '10px 46px', flexWrap: 'wrap' }}>
                {extendAttrList.map(item => (
                  <span className="flexRow alignItemsCenter">
                    <Checkbox
                      className="InlineBlock"
                      checked={extendAttrValue.indexOf(item.id) > -1}
                      text={item.name}
                      onClick={value => {
                        if (value) {
                          onChangeExtendAttr(extendAttrValue.filter(l => l !== item.id));
                        } else {
                          onChangeExtendAttr(extendAttrValue.concat(item.id));
                        }
                      }}
                    />
                  </span>
                ))}
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default function SheetSet(props) {
  const [list, setState] = useState([]);
  const { onChange } = props;

  useEffect(
    () => {
      const { sheet = {} } = props;
      const { readLevel, editLevel, removeLevel, canEditExtendAttrs, canReadExtendAttrs, canRemoveExtendAttrs } = sheet;
      const { showRead, showEdit, showRemove } = props.formatViews(sheet.views);
      setState([
        {
          title: _l('可查看哪些记录？'),
          img: lookPng,
          k: 'readLevel',
          type: 'look',
          disable: ![20, 30, 100].includes(readLevel) || !showRead,
          disabled: !showRead,
          value: readLevel,
          extendAttrValue: canReadExtendAttrs,
          ek: 'canReadExtendAttrs',
        },
        {
          title: _l('可修改哪些记录？'),
          img: editPng,
          k: 'editLevel',
          type: 'edit',
          disable: ![20, 30, 100].includes(editLevel) || !showRead || !showEdit,
          disabled: !showRead || !showEdit,
          value: editLevel,
          extendAttrValue: canEditExtendAttrs,
          ek: 'canEditExtendAttrs',
        },
        {
          title: _l('可删除哪些记录？'),
          img: delPng,
          k: 'removeLevel',
          type: undefined,
          disable: ![20, 30, 100].includes(removeLevel) || !showRead || !showRemove,
          disabled: !showRead || !showRemove,
          value: removeLevel,
          extendAttrValue: canRemoveExtendAttrs,
          ek: 'canRemoveExtendAttrs',
        },
      ]);
    },
    [props],
  );

  const getData = data => {
    const { value, type = 'operation', disable } = data;
    return [
      {
        text: _l('全部'),
        value: 100,
        checked: value === 100 && !disable,
      },
      {
        text: type === 'look' ? _l('用户加入的') : _l('用户拥有的'),
        value: 20,
        checked: [20, 30].includes(value) && !disable,
      },
      // {
      //   text: _l('不允许'),
      //   value: 0,
      //   checked: ![20, 30, 100].includes(value) || disable,
      // },
    ];
  };

  return (
    <Wrap className="TxtLeft">
      <div className="Font13">
        {list.map((o, i) => {
          let data = getData(o);
          return (
            <React.Fragment key={`i-${i}`}>
              <div className="mTop30 Font16 title LineHeight26">
                <img src={o.img} className="mRight5 TxtMiddle" height={26} />
                {o.title}
              </div>
              <div className="mTop10 radioCon flexRow">
                <div className="flex conRadioGroup">
                  <RadioGroup
                    data={data}
                    disabled={o.disabled && i > 0}
                    key={`radioItem-${i}`}
                    radioItemClassName={'radioItem'}
                    onChange={value => {
                      onChange({
                        [o.k]: value,
                      });
                    }}
                  />
                  <TipsRender
                    {...props}
                    type={o.type}
                    key={`TipsRender-${i}`}
                    value={o.value}
                    disable={o.disable}
                    onChange={value =>
                      onChange({
                        [o.k]: value,
                      })
                    }
                    extendAttrValue={o.extendAttrValue}
                    onChangeExtendAttr={value =>
                      onChange({
                        [o.ek]: value,
                      })
                    }
                  />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </Wrap>
  );
}
