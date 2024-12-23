---
title: "기존 서비스에 다국어를 어떻게 효율적으로 지원할 수 있을까?"
excerpt: "클랩에서의 다국어 지원 경험을 공유합니다."
coverImage: "/assets/blog/how-to-support-i18n/cover.png"
date: "2024-12-21T10:20:01.766Z"
author:
  name: "홍준혁"
  picture: "/assets/blog/authors/liam.jpeg"
  description: "변경사항에 유연하게 대처하기 위한 코드 설계에 관심이 많습니다."
ogImage:
  url: "/assets/blog/how-to-support-i18n/cover.png"
published: true
---

다국어는 간단하면서 복잡한 문제입니다. 오늘은 리액트 환경에서 다국어를 지원하기 위해서 어떤 노력들이 있었는지 공유할까 합니다.

## 다국어를 지원하기 위해서 찾은 내용들

일단, 다국어를 지원하기 위해서 기존에 어떤 방식을 사용했는지 꼼곰히 리서치해봤습니다. 다국어를 지원하기 위한 정말 많은 방법들이 있다는 것을 알게되었습니다. 실제로 클랩 개발자들이 논의 단계에서 정말 많은 의견 충돌이 있었던 두가지의 주제를 이야기해보겠습니다.

1. 그 많은 번역객체들을 어떻게 관리할 것인가?
2. 번역객체에 문구들을 어떤 형식으로 만들것인가?

## 그 많은 번역 객체들을 어떻게 관리할 것인가?

기존에 한가지의 언어만 지원하던 서비스는 갑자기 언어 하나를 지원하기에는 너무 방대한 양의 문구가 존재하게 됩니다.
그래서 저희도 이거와 관련한 여러가지 고민들이 있었습니다.

저희는 다국어를 지원하기 위한 Hard Limit이 너무나 짧았기때문에 최대한 빠르게 구현할 수 있었어야 했습니다.

그래서 논의된 방식은 총 두가지가 있었습니다.

- 문구를 기반으로 `Hash Key`를 생성해주는 방식
- 문구에 대한 `Key`를 직접 만들어주는 방식

두 방식 모두 `Key`라는 것에 초점이 있습니다. 왜 `Key`라는 것이 필요할까요?
이것은 구현 방식을 생각해보면 됩니다.

유저가 선호하는 언어를 기반으로 어떤 문구를 보여줘야할지 결정해야합니다.
가장 기본적으로 생각해볼 수 있는건 아래와 같은 형태이죠.

```tsx
<span>{locale === "ko" ? "안녕하세요" : "Hello"}</span>
```

하지만 이렇게되면 번역 문구들을 한눈에 파악하는게 힘들고, 번거롭기까지 합니다.
그래서 이런 번역 문구들을 하나의 객체로 만들어서 한눈에 관리하기 쉽게 하는겁니다.

```json
// ko.json
{
  "번역키1": "안녕하세요"
}
```

```json
// en.json
{
  "번역키1": "hello"
}
```

```tsx
const t = useTranslation();
<span>{t("번역키1")}</span>;
```

지금은 t라는 함수가 추상화되어 있지만 내부 동작은 `ko.json`, `en.json`에 대한 데이터를 가지고 있고, 번역키를 전달받으면 `locale`에 따라 어떤 문구를 리턴해줄지 결정하는 함수입니다.

하지만 앞서 말씀드렸듯 이미 많은 문구가 있는 경우에 이 번역객체를 어떻게 만들 수 있을지 고민이 많았습니다.
그래서 저희가 논의한 2가지 방법을 공유드립니다.

### 문구에 대한 `Key`를 직접 만들어주는 방식

이 방식은 가장 보편적으로 사용되는 방식입니다.
서비스 내 사용되는 모든 문구를 스크랩하여 문구에 대한 키값을 직접 만드는 방식입니다.
마치 개발자가 변수명을 지어주듯, 문구도 변수명을 지어줍니다.

"목표 사이클 목록"이라는 문구는 "cycleList"라고 지어주는 것이죠.

**결론부터 말씀드리면 저희는 이 방식을 채택했습니다.**

클랩 코드 내부에 있는 모든 한국어 문자열을 일련의 스크립트를 통해서 전부 취득하고 엑셀 시트에 이를 정리했습니다.
어느 파일에서 불러온 문자열인지, 몇번째 라인에 있었는지 같은 정보들도 가져올 수 있었죠.

이 스크립트를 통해서 가져온 문구들은 결코 완벽하지 않습니다. 왜냐하면 말 그대로 "모든 한국어 문자열"을 가져오기 떄문이죠.
그래서 잘못 가져온 경우도 있고 문구 중간에 html 태그가 포함된 경우 문구들이 끊기는 경우가 발생했었습니다.

그래서 저희는 엑셀 시트를 보며 어떤 문구가 잘못되었는지, 끊긴 부분은 어디인지 하나하나 확인하는 작업을 했습니다.

![SLACK](/assets/blog/how-to-support-i18n/image1.png)

그러면 방대한 키에 대한 이름은 어떻게 지정했을까요? 참고로 저의 서비스의 한국어 문구 스크랩 row는 총 3000개 정도 되었습니다.

그 해답은 `chat-gpt`였습니다.

일련의 스크립트를 주고 질의를 해가며 key를 자동 생성해주는 방식으로 진행했었습니다.
결과는 생각보다 좋다고 생각했습니다. 그래서 저희는 만들어진 시트를 기획자분께 전달드렸습니다.

하지만 기획팀에서는 이 키값이 어떤 기준으로 지어지는지 정확히 알기 힘들다고 하셨습니다.
이건 꽤나 큰 이슈였는데, 다국어 시트 관리를 기획팀에서 관리하기를 기대하고 있었지만, 기획팀에서는 이 키를 만드는것이 부담스럽다는 의견을 받았었습니다.

그래서 키 값을 제외한 부분들은 기획팀에서 담당하기로 하였고, 키 부분은 개발자가 직접 만드는 것으로 결정이 되었습니다. (이 부분은 좀 아쉬웠던 부분인 것 같습니다.)

### 문구를 기반으로 `Hash Key`를 생성해주는 방식

이 방식은 도입되지 않았지만, 꽤나 괜찮은 아이디어인 것 같아서 공유드릴까합니다.
이 방식은 아래와 같은 형식으로 사용됩니다.

```tsx
<Localized defaultMessage="안녕하세요">
```

그러면 Localized 컴포넌트는 자동으로 defaultMessage를 기반으로 Hash Key 값을 만들어줍니다.
그리고 ko.json, en.json에 아래와 같이 필드가 생성됩니다.

```json
// ko.json

{
  "k1mw3ke3": "안녕하세요"
}
```

앱에서 설정한 기본 Locale에 defaultMessage를 할당하고 그 외의 다국어 번역 객체에는 Hash 값을 키로 하는 필드를 만들고 빈 값을 할당합니다.

```json
// en.json

{
  "k1mw3ke3": ""
}
```

그러면 추후에 해당 필드에 대한 번역 값을 넣어주기만 하면 `Locale`에 따라서 자동으로 반영됩니다.
그래서 초기에 번역 객체를 만드는 과정에서 공수가 조금 줄어든다는 장점이 있습니다.

이 방법도 괜찮은 아이디어라고 생각되었지만 도입하지 않았던 이유는 번역 키가 어떤 문구인지 한눈에 파악도 힘들다는 단점이 있고,
문구를 기반으로 `Hash` 필드를 만들기때문에 문구가 조금이라도 바뀌면 `Hash`값 자체가 바뀌어서 관리하기 힘들어진다는 단점도 있었습니다.

그래서 개발팀에 논의 끝에 키 값을 직접 만들어주는 방식으로 했었습니다.

하지만 관리만 잘 된다면 충분히 좋은 아이디어이기 때문에 도입을 고려해봐도 좋을 것 같습니다.

## 번역객체에 문구들을 어떤 형식으로 만들것인가?

번역 객체를 어떻게 만들지 논의가 되었으니, 실질적으로 문구들을 어떻게 관리할 것인지 논의를 해야했습니다.
이것도 마찬가지로 두가지의 쟁점이 있었습니다.

- 문구 자체에 인라인 `HTML`이 포함되게 하자.
- 문구에는 `HTML`이 포함되면 안된다. 플레이스 홀더 태그로 대체하자.

![SLACK2](/assets/blog/how-to-support-i18n/image2.png)

이거 관련해서는 정말 많은 논의가 있었습니다.

그만큼 중요한 부분이기도 했고 잘 해보고싶은 마음이 컸던 것 같습니다.

### 문구 자체에 인라인 `HTML`이 포함되게 하자

이 방식의 대한 예시를 들어보면 아래와 같습니다.

```json
"번역키1": "안녕하세요 저는 <span style="color: blue">홍준혁</span> 입니다."
```

문구 자체에 HTML태그가 포함되어서, 사용하는 단에서는 HTML Parser를 사용하는 방식입니다.
React로 예시를 들면 아래와 같습니다.

```tsx
const useCustomTranslation = () => {
  const t = useTranslation();
  const content = t("번역키1");
  const parsedContent = reactHTMLParser(content);

  return parsedContent;
};
```

번역키에 대한 값을 가져와서, HTML 파서를 매핑하여 번역을 진행하게 되는것이죠.

저는 처음에 이 방식에 대해서 반대했었습니다. 반대했던 이유는 아래와 같습니다.

1. 기획팀이 앞으로 번역 시트를 관리하게 될텐데 그러면 이 `HTML` 관리가 복잡해질 것 같다.
2. 한국어 번역본, 영어 번역본 두개의 파일이 있다고 가정했을 때 스타일을 두 파일에 모두 수정을 해야한다. 실수가 있을수도 있을수도 있다.
3. 스타일 수정이 필요할 때 프론트엔드 코드를 수정하는게 아니라 번역 객체를 수정해야하는게 어색하다.
4. 중간에 `React Component`나 `Event Handler`를 연결하려면 어려움이 있다.

이 4가지 정도의 의견을 가지고 개발팀이랑 정말 많은 논의를 했었습니다.

그래서 반대를 하면서 제가 제시한 의견은 아래의 의견입니다.

### 문구에는 `HTML`이 포함되면 안된다. 플레이스 홀더 태그로 대체하자

이 방식은 예를 들면 아래와 같은 방식입니다.

```json
"번역키1": "안녕하세요 저는 <name>홍준혁</name> 입니다."
```

이러한 번역 객체가 있다고 가정했을 때 직접 name에 대해서 어떤 태그를 렌더링 할것인지 직접 전달하는 방식이였습니다.

```tsx
t("번역키1", {
  name: <Link />,
});
```

예시 코드이긴 하지만 위와 어떤 컴포넌트를 렌더링할지 전달하면 아래와같이 자동으로 replace됩니다.

```tsx
안녕하세요 저는 <Link>홍준혁</Link> 입니다.
```

이것에 대한 정확한 기술이름을 못찾아서 이것을 `리플레이스 태그 방식`이라고 자칭했습니다.
이렇게되면 조금 더 `Frotnend` 개발에 유연한 방식으로 구현할 수 있고 번역 객체에는 정말 필요한 번역 문구만 지정할 수 있게됩니다.

이전 직장에서도 이러한 방식을 사용해왔기 때문인지 몰라도 저는 이 방식을 주장해왔습니다.

그래서 이 의견을 설득시키는 과정에서 CTO 분이랑 정말 많은 의견 교류를 했었지만...

**결국 저는 패배했습니다.**

이것이 가져다주는 명확한 장점이 무엇인지 설득을 잘 못했거든요.

경험해보지 않은 구성원에게 설득할 때는 크게 와닿지 않을 수 있다는걸 간과했었습니다.

그래서 이 과정에서 많은 것을 배울 수 있었습니다.

_설득이 필요한 땐 가장 먼저 나를 설득할 수 있어야하고 두번째론 모두가 수용할 수 있을만한 강력한 킥을 준비해야 한다는 것을요._

아무튼 저희는 "문구 자체에 인라인 `HTML`이 포함되게 하자"를 구현하기 시작했습니다.

### How to Develop?

기왕 이렇게 되었으니 `DX`를 좋게하는것이 저에게 남겨진 과제였습니다.

저희는 다국어 지원을 위해서 `next-intl`이라는 라이브러리를 선택하게 되었습니다.

다국어 지원을 위해서 설정해야하는 다양한 설정을 단순화할 수 있는 장점이 있어서 도입하게 되었는데

여기에는 큰 문제점이 하나 있었습니다.

"`next-intl`은 인라인 HTML 방식을 지원하지 않습니다!!!!!!!!!"

이것은 너무나도 충격적인 내용이였습니다. 그래서 저희는 이걸 해결하기 위한 다양한 방법을 논의해봤습니다.

`next-intl`에서 번역 문구에 동적인 값을 할당할 수 있습니다. 동적인 값이라고 하면 이런 형식의 데이터입니다.

```txt
안녕하세요 저는 {name}입니다.
```

그러면 위 {name} 부분이 동적 값을 삽입할 수 있는 부분이고 아래와 같이 사용할 수 있습니다.

```ts
const t = useTranslations();

t("번역키", { name: "홍준혁" });
```

여기서 문제는 `t` 함수 호출부였는데, 인라인 HTML이 포함된 문자열은 유효하지 않은 문자열이라고 판단하여 오류를 내는 것이였습니다.

### 위기의 클랩...! 해결방법은?

하지만 한가지 꼼수가 있었는데, `t.raw` 라는 함수를 호출하면 문자열을 불러올 수 있었습니다.
하지만 이렇게 되면 변수에 동적으로 값을 할당하는 동작을 못하게됩니다.

말 그대로 raw데이터인

```txt
안녕하세요 저는 {name}입니다.
```

이 문장을 그대로 가져오게 되는겁니다.

그래서 저희는 직접 동적 변수를 넣을 수 있게 구현하기로 결정했습니다.

이렇게 커스텀 훅을 만들어서 구현했습니다.

```ts
const useLocalized = (): ReturnType => {
  const t = useTranslations();

  const customTranslation = <T extends React.ReactNode | React.ReactElement[]>(
    i18nKey: string,
    values?: Record<string, React.ReactNode>
  ): T => {
    // raw content로 문자열을 가져옴.
    const rawContent = t.raw(i18nKey);
    // raw content를 못가져오면 i18nKey를 그대로 리턴함.
    if (rawContent === i18nKey) return i18nKey as T;
    // 값을 가져오면 render에 전달함.
    return render(rawContent, values) as T;
  };

  return customTranslation;
};
```

여기서 핵심 로직은 `render` 부분인데 구현은 아래와 같이 되어있습니다.

```ts
function render(
  source: string,
  values?: Record<string, ReactNode | ReactElement>
): string | ReactElement[] {
  // 동적 변수가 없다면 단순히 html parse를 하여 리턴함.
  if (!values) {
    return parse(source) as string | ReactElement[];
  }

  // 동적 변수가 있다면 문자열에 값을 삽입함.
  const replacedSource = placeholderGenerator(source, values);
  return elementReplacer(replacedSource, values) as ReactElement[];
}
```

하지만 문제는 React Element 입니다. placeholderGenerator는 원시값 형태의 데이터는 문자열에 삽입할 수 있지만
React Element는 그것이 불가능합니다. 그래서 values의 타입이 React Element라면 일련의 인디케이터로 변환하는 작업을 하였습니다.

```txt
안녕하세요 __REACT_ELEMENT_{변수명}__ 입니다.
```

그러면 elementReplacer라는 별도의 함수에서 이 부분을 React Element로 변환합니다.
이것은 html-react-parser에서 지원하는 기능이라서, 손쉽게 구현할 수 있었습니다.

```tsx
import { ReactElement, ReactNode } from "react";
import parse from "html-react-parser";

function elementReplacer(source: string, values: Record<string, ReactNode>) {
  return parse(source, {
    replace: (domNode) => {
      if (domNode.type === "text" && domNode.data) {
        const parts = domNode.data.split(/(__REACT_ELEMENT_[a-zA-Z0-9]+__)/);

        const elements = parts.map((part) => {
          const matchKey = part.match(/^__REACT_ELEMENT_([a-zA-Z0-9]+)__$/);
          if (matchKey && matchKey[1] in values) {
            return values[matchKey[1]];
          }
          return part;
        });

        return <>{elements}</>;
      }
    },
  }) as ReactElement[];
}

export default elementReplacer;
```

이제, 위와 같은 동작을 통하여 클랩에서도 다국어를 지원할 수 있는 준비가 되었습니다.

다른 클라 개발자분들도 쉽게 사용할 수 있도록 [API 문서](https://celestial-juice-f35.notion.site/useLocalized-API-Docs-163c17b94c2f80ec87abfa9735df409b?pvs=4)와 사용 예시가 담긴 데모 페이지를 제공했습니다.

![SLACK3](/assets/blog/how-to-support-i18n/image3.png)

기반 작업은 완료되었지만, 아직 클랩의 다국어 변환은 진행중이에요.

위 방식을 사용하면서 불편한 점이나 변경된 내용이 있으면 해당 글에 내용을 추가하도록 하겠습니다.
