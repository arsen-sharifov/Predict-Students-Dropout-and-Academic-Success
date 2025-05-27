interface VariableInfo {
  uk: string;
  en: string;
  role: string;
  type: string;
  demo: string;
  desc: string;
  units: string;
  missing: string;
}

const variables: VariableInfo[] = [
  {
    uk: "Сімейний стан",
    en: "Marital Status",
    role: "Ознака",
    type: "Integer",
    demo: "Сімейний стан",
    desc: "1 – неодружений; 2 – одружений; 3 – вдівець; 4 – розлучений; 5 – фактичний союз; 6 – юридичне розлучення",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Режим вступу",
    en: "Application mode",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "1 – 1‑ша фаза загальний контингент; 2 – Постанова №612/93; 5 – спецконтингент (Азори); 7 – інші курси; 10 – №854-B/99; 15 – міжнародний студент; 16 – спецконтингент (Мадейра); 17 – 2‑га фаза; 18 – 3‑тя фаза; 26 – №533-A/99 b2; 27 – №533-A/99 b3; 39 – старші 23; 42 – трансфер; 43 – зміна курсу; 44 – дипломні фахівці; 51 – зміна установи/курсу; 53 – короткий цикл; 57 – міжнародний трансфер",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Порядок заявки",
    en: "Application order",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "0 – перший вибір; 9 – останній вибір",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Курс",
    en: "Course",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "33 – Біопаливні технології; 171 – Анімація та мультимедіа; 8014 – Соцслужба (вечірня); 9003 – Агрономія; 9070 – Дизайн; 9085 – Ветер. сестра; 9119 – Інформ. інж.; 9130 – Конярство; 9147 – Менеджмент; 9238 – Соцслужба; 9254 – Туризм; 9500 – Сестрин.; 9556 – Стоматол. гігієна; 9670 – Реклама; 9773 – Журналістика; 9853 – Початкова освіта; 9991 – Менеджмент (вечірня)",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Форма навчання",
    en: "Daytime/evening attendance",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "1 – денна; 0 – вечірня",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Попередня кваліфікація",
    en: "Previous qualification",
    role: "Ознака",
    type: "Integer",
    demo: "Рівень освіти",
    desc: "1 – середня; 2 – бакалавр; 3 – ступінь; 4 – магістр; 5 – доктор; 6 – частота; 9 – 12 рік незак.; 10 – 11 рік незак.; 12 – інші; 14 – 10 рік; 15 – 10 рік незак.; 19 – базова освіта 3 цикл; 38 – базова освіта 2 цикл; 39 – спецкурс; 40 – 1 цикл; 42 – профтехкурс; 43 – магістратура",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Бал попередньої кваліфікації",
    en: "Previous qualification grade",
    role: "Ознака",
    type: "Continuous",
    demo: "–",
    desc: "Бал між 0 і 200",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Громадянство",
    en: "Nationality",
    role: "Ознака",
    type: "Integer",
    demo: "Національність",
    desc: "1 – португалець; 2 – німець; 6 – іспанець; 11 – італієць; 13 – нідерландець; 14 – англієць; 17 – литовец; 21 – анголець; 22 – кабовердеанець; 24 – гвінеєць; 25 – мозамбиканець; 26 – сантомец; 32 – турок; 41 – бразилець; 62 – румун; 100 – молдаванин; 101 – мексиканець; 103 – українець; 105 – росіянин; 108 – кубинець; 109 – колумбієць",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Кваліфікація матері",
    en: "Mother's qualification",
    role: "Ознака",
    type: "Integer",
    demo: "Рівень освіти",
    desc: "1 – середня; 2 – бакалавр; 3 – ступінь; 4 – магістр; 5 – доктор; 6 – частота; 9 – 12 рік незак.; 10 – 11 рік незак.; 11 – 7 рік; 12 – інші; 14 – 10 рік; 18 – загальна торгівля; 19 – базова освіта 3 цикл; 22 – проф.-тех.; 26 – 7 рік; 27 – 2 цикл ЗОШ; 29 – 9 рік незак.; 30 – 8 рік; 34 – невідомо; 35 – неписьменний; 36 – читає без 4 класу; 37 – базова освіта 1 цикл; 38 – базова освіта 2 цикл; 39 – спецкурс; 40 – 1 цикл; 41 – спецкурс; 42 – профтехкурс; 43 – магістратура; 44 – докторантура",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Кваліфікація батька",
    en: "Father's qualification",
    role: "Ознака",
    type: "Integer",
    demo: "Рівень освіти",
    desc: "1 – середня; 2 – бакалавр; 3 – ступінь; 4 – магістр; 5 – доктор; 6 – частота; 9 – 12 рік незак.; 10 – 11 рік незак.; 11 – 7 рік; 12 – інші; 13 – 2 курс доп.; 14 – 10 рік; 18 – загальна торгівля; 19 – базова освіта 3 цикл; 20 – доп. ЗОШ; 22 – проф.-тех.; 25 – доп. ЗОШ незак.; 26 – 7 рік; 27 – 2 цикл ЗОШ; 29 – 9 рік незак.; 30 – 8 рік; 31 – адміністрування; 33 – бухгалтерія; 34 – невідомо; 35 – неписьменний; 36 – читає без 4 класу; 37 – базова освіта 1 цикл; 38 – базова освіта 2 цикл; 39 – спецкурс; 40 – 1 цикл; 41 – спецкурс; 42 – профтехкурс; 43 – магістратура; 44 – докторантура",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Кваліфікація матері (заняття)",
    en: "Mother's occupation",
    role: "Ознака",
    type: "Integer",
    demo: "Заняття",
    desc: "0 – студент; 1 – законодавці та керівники; 2 – фахівці; 3 – техніки; 4 – службовці; 5 – обслуговування; 6 – аграрні; 7 – ремісники; 8 – оператори; 9 – прості; 10 – ЗСУ; 90 – інші; 99 – порожньо; 122 – медпрацівники; 123 – вчителі; 125 – ІКТ; 131 – науки; 132 – здоров'я; 134 – право; 141 – офіс; 143 – фінанси; 144 – адміністрування; 151 – особисті послуги; 152 – продажі; 153 – догляд; 171 – будівництво; 173 – друк; 175 – харчування; 191 – прибирання; 192 – аграрні прості; 193 – видобувні прості; 194 – помічники",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Кваліфікація батька (заняття)",
    en: "Father's occupation",
    role: "Ознака",
    type: "Integer",
    demo: "Заняття",
    desc: "0 – студент; 1 – законодавці та керівники; 2 – фахівці; 3 – техніки; 4 – службовці; 5 – обслуговування; 6 – аграрні; 7 – ремісники; 8 – оператори; 9 – прості; 10 – ЗСУ; 90 – інші; 99 – порожньо; 101 – офіцери; 102 – сержанти; 103 – ЗСУ персонал; 112 – адміністратори; 114 – директори; 121 – наукові; 122 – медпрацівники; 123 – вчителі; 124 – фінанси; 131 – науки; 132 – здоров'я; 134 – право; 135 – ІКТ; 141 – офіс; 143 – фінанси; 144 – адміністрування; 151 – особисті послуги; 152 – продажі; 153 – догляд; 154 – охорона; 161 – фермери; 163 – мисливці; 171 – будівництво; 172 – металургія; 174 – електрика; 175 – харчування; 181 – оператори; 182 – збірка; 183 – водії; 192 – аграрні прості; 193 – видобувні прості; 194 – помічники; 195 – вуличні продавці",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Бал вступу",
    en: "Admission grade",
    role: "Ознака",
    type: "Continuous",
    demo: "–",
    desc: "Бал між 0 і 200",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Переміщений",
    en: "Displaced",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "1 – так; 0 – ні",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Спеціальні освітні потреби",
    en: "Educational special needs",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "1 – так; 0 – ні",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Боржник",
    en: "Debtor",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "1 – так; 0 – ні",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Оплата навчання вчасно",
    en: "Tuition fees up to date",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "1 – так; 0 – ні",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Стать",
    en: "Gender",
    role: "Ознака",
    type: "Integer",
    demo: "Стать",
    desc: "1 – чоловік; 0 – жінка",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Стипендіат",
    en: "Scholarship holder",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "1 – так; 0 – ні",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Вік при вступі",
    en: "Age at enrollment",
    role: "Ознака",
    type: "Integer",
    demo: "Роки",
    desc: "Вік студента при вступі",
    units: "Роки",
    missing: "ні",
  },
  {
    uk: "Міжнародний",
    en: "International",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "1 – так; 0 – ні",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Зараховані кредитні одиниці 1 сем",
    en: "Curricular units 1st sem (credited)",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "Число кредитів, зарахованих 1 сем",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Записані кредитні одиниці 1 сем",
    en: "Curricular units 1st sem (enrolled)",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "Число кредитів, записаних 1 сем",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Оцінки 1 сем",
    en: "Curricular units 1st sem (evaluations)",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "Кількість оцінок 1 сем",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Зараховані 1 сем",
    en: "Curricular units 1st sem (approved)",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "Число затверджених кредитів 1 сем",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Середній бал 1 сем",
    en: "Curricular units 1st sem (grade)",
    role: "Ознака",
    type: "Continuous",
    demo: "–",
    desc: "Середній бал 1 сем від 0 до 20",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Без оцінок 1 сем",
    en: "Curricular units 1st sem (without evaluations)",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "Кількість без оцінок 1 сем",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Зараховані кредитні одиниці 2 сем",
    en: "Curricular units 2nd sem (credited)",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "Число кредитів, зарахованих 2 сем",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Записані кредитні одиниці 2 сем",
    en: "Curricular units 2nd sem (enrolled)",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "Число кредитів, записаних 2 сем",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Оцінки 2 сем",
    en: "Curricular units 2nd sem (evaluations)",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "Кількість оцінок 2 сем",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Зараховані 2 сем",
    en: "Curricular units 2nd sem (approved)",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "Число затверджених кредитів 2 сем",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Середній бал 2 сем",
    en: "Curricular units 2nd sem (grade)",
    role: "Ознака",
    type: "Continuous",
    demo: "–",
    desc: "Середній бал 2 сем від 0 до 20",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Без оцінок 2 сем",
    en: "Curricular units 2nd sem (without evaluations)",
    role: "Ознака",
    type: "Integer",
    demo: "–",
    desc: "Кількість без оцінок 2 сем",
    units: "–",
    missing: "ні",
  },
  {
    uk: "Рівень безробіття",
    en: "Unemployment rate",
    role: "Ознака",
    type: "Continuous",
    demo: "–",
    desc: "Рівень безробіття (%)",
    units: "%",
    missing: "ні",
  },
  {
    uk: "Рівень інфляції",
    en: "Inflation rate",
    role: "Ознака",
    type: "Continuous",
    demo: "–",
    desc: "Рівень інфляції (%)",
    units: "%",
    missing: "ні",
  },
  {
    uk: "ВВП",
    en: "GDP",
    role: "Ознака",
    type: "Continuous",
    demo: "–",
    desc: "Валовий внутрішній продукт",
    units: "–",
    missing: "ні",
  },
];

export default function InfoPanel() {
  return (
    <aside className="h-full bg-gray-800/70 p-6 rounded-xl shadow overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Опис вхідних змінних</h3>
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2 text-left">Назва (Variable Name)</th>
            <th className="p-2 text-left">Роль</th>
            <th className="p-2 text-left">Тип</th>
            <th className="p-2 text-left">Демографічні</th>
            <th className="p-2 text-left">Опис</th>
            <th className="p-2 text-left">Одиниці</th>
            <th className="p-2 text-left">Відсутні</th>
          </tr>
        </thead>
        <tbody>
          {variables.map((v) => (
            <tr key={v.en} className="odd:bg-gray-700/40">
              <td className="p-2">
                {v.uk} <span className="italic">({v.en})</span>
              </td>
              <td className="p-2">{v.role}</td>
              <td className="p-2">{v.type}</td>
              <td className="p-2">{v.demo}</td>
              <td className="p-2">{v.desc}</td>
              <td className="p-2">{v.units}</td>
              <td className="p-2">{v.missing}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
}
