import React, { useEffect, useState } from "react";
import { NextPage } from 'next';
import { TFunction } from "next-i18next";
import { NextSeo } from "next-seo";

import { withTranslation } from "../../i18n";
import { SWrapper, SSection, SMenu, SShowBox } from "./style";
import features from "../../data/products/api7/features.json";

type Props = {
  t: TFunction;
  list: Section[];
};

const Features: NextPage<Props, any> = ({ t, list = [] }) => {
  const [currentHeight, setCurrentHeight] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setCurrentHeight(document.documentElement.scrollTop);
    });
    autoMenuSelected();
  }, [currentHeight]);

  const autoMenuSelected = () => {
    if (currentHeight < 1944) {
      onSelected(0);
    }
    if (currentHeight >= 1944) {
      onSelected(1);
    }
    if (currentHeight >= 2708) {
      onSelected(2);
    }
    if (currentHeight >= 3082) {
      onSelected(3);
    }
    if (currentHeight >= 3622) {
      onSelected(4);
    }
  };

  const onSelected = (e: number) => {
    const selected = document.querySelector('.selected');
    const target = document.getElementById(`unActive_${e}`);
    if (selected) {
      selected.classList.remove('selected');
    }
    target.classList.add('selected');
  }

  return (
    <SWrapper>
      <NextSeo title={t(`common:features`)} />
      <SSection>
        <div className="background"></div>
        <div className="titleBox">
          <h1>{t(`common:features`)}</h1>
          <p>{t(`features:features-title-decs`)}</p>
        </div>
        <SMenu>
          <ul className={currentHeight > 320 && "newmenu"}>
            {list.map((item, index) => {
              return (
                <li id={`unActive_${index}`} key={index}><a href={`#${item.title}`} onClick={() => { onSelected(index) }}>{item.title}</a></li>
              )
            })}
          </ul>
        </SMenu>
      </SSection>
      <SShowBox>
        {list.map((item) => (
          <div className="sectionBox" key={item.title}>
            <h2 id={item.title}>{item.title}</h2>
            <div className="itemBox">
              {(item.list).map((item) => (
                <div className="itemBoxList" key={item.title}>
                  <h3>{item.title}</h3>
                  <ul>
                    {item.list.map((item) => (
                      <li key={item.title}>
                        {item.href !== "" && <a href={item.href}>{item.title}</a>}
                        {item.href === "" && <span>{item.title}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </SShowBox>
      <div id="footer"></div>
    </SWrapper>
  );
};

Features.getInitialProps = async (context) => {
  const { lng = "zh-CN" } = (context.req as any) || {};

  const posts = features[lng];

  return {
    namespacesRequired: ["common"],
    list: posts,
  };
};

export default withTranslation("features")(Features as any);
