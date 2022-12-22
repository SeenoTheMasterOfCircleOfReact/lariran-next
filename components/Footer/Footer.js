import { useState } from "react";
import Link from "next/link";

import classes from "./Footer.module.scss";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Image from "next/image";

export default function Footer() {
  const [open, setOpen] = useState(false);

  function handleOpenToggle(state) {
    setOpen(state);
  }

  return (
    <footer className={classes.footer}>
      <div className={classes.holder}>
        <div className={classes.features}>
          <div className={classes.feature}>
            <div>
              <SupportAgentIcon sx={{ fontSize: "3rem" }} />
            </div>
            <div className={classes.name}>پشتیبانی 24 ساعته</div>
          </div>
          <div className={classes.feature}>
            <div>
              <CurrencyExchangeRoundedIcon sx={{ fontSize: "3rem" }} />
            </div>
            <div className={classes.name}>تعویض تا 7 روز</div>
          </div>
          <div className={classes.feature}>
            <div>
              <LocalShippingOutlinedIcon sx={{ fontSize: "3rem" }} />
            </div>
            <div className={classes.name}>تحویل فوری</div>
          </div>
          <div className={classes.feature}>
            <div>
              <VerifiedOutlinedIcon sx={{ fontSize: "3rem" }} />
            </div>
            <div className={classes.name}>ضمانت اصالت کالا</div>
          </div>
        </div>
        <div className={classes.main}>
          <div className={classes.right}>
            <div className={classes.contact}>
              <div className={classes.lariran}>
                <div>فروشگاه اینترنی لاریران</div>
              </div>
              <div className={classes.bottom}>
                <div>تلفن پشتیبانی</div>
                <div>09177375015</div>
              </div>
            </div>
            <div className={classes.links}>
              <div className={classes.title}>
                <div>لینک های پرکاربرد</div>
              </div>
              <div className={classes.bottom}>
                <div> درباره ما</div>
                <div>تماس با ما</div>
              </div>
            </div>
          </div>
          <div className={classes.left}>
            <div className={classes.socialMedia}>
              <div className={classes.title}>شبکه های اجتماعی</div>
              <div className={classes.bottom}>
                <a href="https://instagram.com/lariran?igshid=YmMyMTA2M2Y=">
                  <div className={classes.anchorHolder}>
                    <InstagramIcon />
                    <span>اینستاگرام</span>
                  </div>
                </a>
                <a href="https://instagram.com/lariran?igshid=YmMyMTA2M2Y=">
                  <div className={classes.anchorHolder}>
                    <WhatsAppIcon />
                    <span>واتساپ</span>
                  </div>
                </a>
              </div>
            </div>
            <div className={classes.eNamad}>
              <a
                href="https://trustseal.enamad.ir/?id=246833&code=j9dVOTTeUcA5Vw8Rwk2Y"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/images/footer/namad.png"
                  alt="نماد الکترونیکی"
                  width={100}
                  height={100}
                />
              </a>
            </div>
          </div>
        </div>
        <div className={classes.weAre}>
          <div>
            <div className={classes.title}>
              لاریران، فروشگاه آنلاین خرید و فروش لوازم خانگی
            </div>
            <div className={classes.extra}>
              فروشگاه اینترنتی لاریران، انتخاب آسان ، خرید آنلاین هر آنچه که در
              خانه نیاز دارید از لاریران بخواهید. فروشگاه اینترنتی لاریران طیف
              وسیعی از لوازم خانه و آشپزخانه را با ایجاد فضایی صادقانه ، با
              تضمین قیمت و اصالت کالا به مشتریان عزیز معرفی و ارائه می نماید.
              لاریران دغدغه خانواده ها را در تهیه به روز ترین لوازم خانگی از
              بهترین برند های جهانی با مناسب ترین قیمت و ضمانت بازگشت محصول را
              برطرف می کند. خریدی آسوده و ساده با مناسب ترین قیمت ایده آل همه
              است.
              {!open && (
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => handleOpenToggle(true)}
                >
                  {" بیشتر "}
                </span>
              )}
            </div>
          </div>
          {open && (
            <div>
              <div>
                <div className={classes.title}>
                  محصولات قابل سفارش در لاریران ؟
                </div>
                <div className={classes.extra}>
                  جدید ترین محصولات ضروری یک خانه مدرن با به روز ترین تکنولوژي
                  های ساخت از برترین برند ها همراه با تخفیفات شگفت انگیز را با
                  چند کلیک درب خانه تحویل بگیرید. شما می توانید از بین برند هایی
                  مثل بوش، فیلیپس، ال جی، سونی، پاناسونیک، سامسونگ، هیتاشی،
                  جنرال، گری، جیپاس، مایر، دلونگی، نوا، کنوود، تفال، وال و ...
                  بر حسب سلیقه تان کالای مورد نیازتان را با مناسب ترین قیمت
                  بازار انتخاب و خرید کنید. در ادامه به معرفی دسته بندی محصولات
                  می پردازیم.
                </div>
              </div>
              <div>
                <div className={classes.title}>تهویه مطبوع</div>
                <div className={classes.extra}>
                  انواع کولر اسپلیت با توان های مختلف ۱۲، ۱۸، ۲۴، ۳۰ هزار وات از
                  برند های جنرال، تی سی ال ، اسنو جنرال، ایوولی، وست پوینت و...
                  انواع بخاری برقی ، انواع پنکه های سقفی و سیار تنها بخشی از
                  محصولات متنوع در این دسته بندی هستند.
                </div>
              </div>
              <div>
                <div className={classes.title}>شست و شو و نظافت </div>
                <div className={classes.extra}>
                  محصولاتی شامل جاروبرقی باتوان های مختلف از برند های معروف بوش
                  ، فیلیپس، پاناسونیک، هیتاشی و ... انواع مختلف لباسشویی و
                  ظرفشویی در ابعاد و توان های مختلف در حالت های اتومات و نیمه
                  اتومات ، انواع کارواش و بخار شوی برای استفاده های مختلف ،
                  انواع اتوبخار، اتو ایستاده و اتو ساده و مسافرتی.
                </div>
              </div>
              <div>
                <div className={classes.title}>یخچال و فریزر</div>
                <div className={classes.extra}>
                  شما می توانید با توجه به نیاز خانه و سلیقه تان از بین محصولات
                  متنوع این گروه وسیله سرمایشی آشپزخانه را انتخاب کنید.انواع
                  یخچال ساید بای ساید ، یخچال فریزر بالا و پایین ، یخچال فریزر
                  دوقلو، یخچال فریزر تک، فریزر تک و یخچال کوچک در این دسته بندی
                  قرار دارند.
                </div>
              </div>
              <div>
                <div className={classes.title}>صوتی و تصویری </div>
                <div className={classes.extra}>
                  محصولاتی شامل سینمای خانگی و تلوزیون های LCD و LED درجه یک
                  بازار ساخت بهترین شرکت ها در ابعاد مختلف ۴۲ ،۴۳، ۵۰،‌ ۵۵، ۶۰ و
                  ۶۵ اینچ ، انواع مختلف کنسول بازی مانند سری های پرطرفدار و
                  معروف PS4، PS5، Xbox، انواع مختلف ساند بار و سیستم صوتی خانگی،
                  انواع مختلف تلفن رومیزی در این گروه جای می گیرند.
                </div>
              </div>
              <div>
                <div className={classes.title}> غذا ساز</div>
                <div className={classes.extra}>
                  شما می توانید از بین مدل های مختلف آسیاب، چرخ گوشت، خرد کن،
                  ساندویچ ساز، غذا ساز، همزن، مخلوط کن، میوه خشک کن و گوشت کوب
                  که در بازار می توان پیدا کرد با اطلاعات کافی و مقایسه قیمت و
                  کیفیت در این زیر گروه بهترین انتخاب را داشته باشید.
                </div>
              </div>
              <div>
                <div className={classes.title}>پخت و پز</div>
                <div className={classes.extra}>
                  اگر به دنبال این هستید که پخت و پز را برای خودتان لذت بخش تر
                  کنید ، کالاهای این بخش می توانند این کار را برای شما انجام
                  دهند و شما با خیالی آسوده می توانید از بین انواع مختلف سرخ کن
                  و هواپز، آون توستر،زود پز و آرام پز، مایکروویو، فر، اجاق گاز،
                  پفیلا ساز، سرویس چاقو و ظروف با تضمین بهترین قیمت خرید کنید.
                </div>
              </div>
              <div>
                <div className={classes.title}>نوشیدنی ساز</div>
                <div className={classes.extra}>
                  با تهیه و خرید هر کدام از دستگاه های آبمیوه گیر، اسپرسو ساز،
                  آبسرد کن، چای ساز و تصقیه آب برای خانه خود لذت نوشیدن را برای
                  خود چند برابر کنید.
                </div>
              </div>
              <div>
                <div className={classes.title}>لوازم منزل</div>
                <div className={classes.extra}>
                  محصولات چرخ خیاطی در این گروه خیال شما از بابت البسه و دوختنی
                  هایتان راحت می کند و با لوازم روشنایی بهترین روشنایی را به
                  خانه خودتان دعوت کنید.
                </div>
              </div>
              <div>
                <div className={classes.title}>آرایشی و بهداشتی</div>
                <div className={classes.extra}>
                  در این دسته بندی انواع مختلف سشوار، اتو مو، ماشین اصلاح و
                  دستگاه پاکسازی صورت به آراسته تر شدن ظاهر شما کمک می کند.
                  {open && (
                    <span
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={() => handleOpenToggle(false)}
                    >
                      {" بستن "}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
