---
title: "Github Labeler 도입하기"
excerpt: "Github Labeler를 공유합니다."
coverImage: "/assets/blog/github-automation/cover.png"
date: "2025-01-04T06:42:50.754Z"
author:
  name: "홍준혁"
  picture: "/assets/blog/authors/liam.jpeg"
  description: "변경사항에 유연하게 대처하기 위한 코드 설계에 관심이 많습니다."
ogImage:
  url: "/assets/blog/github-automation/cover.png"
published: true
---

저는 개발자를 처음 했을때 Github가 너무나 어려웠습니다.
한국인인데 영어로 된 외부 저장소에 코드를 올리는 것 부터해서 모든게 저에게는 낯설기만 했던 것 같아요.

먼저 `Github Action`이라는 선행 지식을 알고가면 좋을 것 같습니다.

## Github Action이란?

이건 쉽게 이해할 수 있도록 추상화해서 설명드리도록 하겠습니다.

`Github Action`은 깃허브에서 제공하는 자동화 플랫폼입니다.
여기서 자동화한다는건 어떤것일까요? Github는 아시다시피 코드를 원격 저장소에 올리고 협업을 원할하게 도와주는 툴입니다.
그러면 그 과정에서 여러가지 반복될 수 있을법한 상황이 있겠죠.

예시 케이스를 들어볼게요.

- `PR`에 대한 `Label`을 매번 수동으로 붙여야한다.
- `Pull Request`가 올라올 때 (이하 PR), 테스트 혹은 Lint를 매번 돌려봐야한다.
- 프로덕션 브랜치에 새로운 변경사항이 있으면 수동으로 배포를 진행한다.
- `PR`에 대한 리뷰어 지정을 매번 일일이 해주어야만 한다.

`Github Action`을 사용하면 위에서 언급한 케이스들에 대해서 자동화를 적용할 수 있게됩니다.
이것이 개발자들이 `Github Action`을 사랑하는 이유이기도 합니다.

여기서 Github Action의 가장 대표적인 기능중 하나인 [Labeler](https://github.com/actions/labeler)를 사용해보면서 친해져보도록 하곘습니다.

## 환경 설정

![레포지토리](https://github.com/user-attachments/assets/f485f2f1-0e9b-47ca-89a8-cfa31ff9f9ec)

일단 레포지토리를 하나 생성했습니디.

[여기서 확인해보실 수 있습니다.](https://github.com/Hong-JunHyeok/github-action-test)

백지 상태에서 하나하나 구축하다 보면 좀 더 감이 잡힐 것 같습니다.

그리고 해당 원격 레포지토리를 로컬이랑 연결해주는 작업 (git clone)을 진행했습니다.

![빈 파일 만들기](https://github.com/user-attachments/assets/96142a18-ead6-424d-bb3c-3698154bb038)

아무것도 없는 리포지토리에 script.js이라는 가상의 작업 파일을 만들고 push 까지 진행해주었습니다.

## Github Action을 활용하여 자동화하기

이제 Github Action을 활용하기 위한 환경 설정은 완료되었습니다.

위에서 설명한 반복될 수 있는 케이스들을 하나하나 살펴보며 자동화를 진행해보겠습니다.

### `PR`에 대한 `Label`을 매번 수동으로 붙이기

보통 협업을 할때는 하나의 브랜치에서 작업을 진행하지 않고, 각 기능에 맞게 여러 브랜치로 나뉘어서 진행하는 것을 선호하실겁니다.

하나의 브랜치에서 작업하게 되었을 때 충돌이 날수도 있고 코드에 변경사항이 너무 많아 최신화를 주기적으로 해주어야 하기 때문에 문제가 많이 발생할 수 있거든요.

그래서 보통 기능에 맞게 브랜치를 나누는 방식으로 진행하실 텐데, 각 조직별로 선호하는 브랜치 네이밍 전략이 있을겁니다.

CLAP에서 사용되는 브랜치 전략은 아래와 같습니다.

```txt
feature: ["feature/*", "feature-*", "feat/*", "feat-*"]
bug: ["fix/*", "fix-*", "bugfix/*", "bug/*"]
techdebt: ["techdebt/*", "techDebt/*"]
```

Feature라는 것은 새로운 기능을 담당하는 브랜치입니다. Bug는 이름 그대로 기존 코드에서 발생하는 오류를 담당하는 브랜치구요, 마지막으로 TechDebt는 "비기능 개발"을 담당하는 브랜치입니다.

비기능 개발이라는 것에 포함되는 것은 린트, 테스트같이 기능에 영향이 가지 않는 개발들을 말합니다.

여기서 Label이라는 개념이 같이 설명되면 좋을 것 같습니다.

Github에서 제공하는 기능인데, Issue나 PR을 식별하고 구분하기 용이하게 합니다.

그런데 Github에서는 이 라벨을 Issue 생성하고 나서나 PR 올리고 나서 유저가 직접 등록을 해주어야 합니다.

여기서 비효율적인 포인트가 발생합니다!

저희는 이미 **브랜치 네이밍 컨벤션**을 통해서 해당 브랜치가 어떤 기능을 하는지 인지할 수 있었습니다.

예를 들면 `feature/*` 이라는 이름의 브랜치는 "새로운 기능을 담당"한다는 것을 알 수 있죠.

그래서 이런 고민을 해볼 수 있을겁니다.

> 그냥 `"feature/*` 형식의 브랜치들은 Label을 자동으로 `Feature` 라고 붙일 수 없을까?

Labeler를 활용하면 이것을 쉽게 구현할 수 있습니다.

Labeler의 README에서도 잘 설명해주고 있지만,

저희가 필요한 "그냥 `"feature/*` 형식의 브랜치들은 Label을 자동으로 `Feature` 라고 붙일 수 없을까?" 니즈를 반영하기 위한 기능만 구현하기 위해서 간략하게 설명해보겠습니다.

먼저 아까 생성했었던 Working Directory에 .github 라는 폴더를 만들어줍니다.

그리고 내부에 `labeler.yml` 이라는 파일을 생성해주세요. 그 내부에 아래와 같이 작성해주시면 됩니다.

```yml
Feature:
  - head-branch: ["^feature", "feature"]
```

- 1번 라인: 붙일 라벨의 이름을 명시합니다. 이 경우, Feature라는 이름의 라벨을 PR에 붙이겠다는 의미입니다.
- 2번 라인: `Feature`라는 라벨을 어느 브랜치에 붙일지 명시합니다. 배열로 문자열을 전달해주고 있는데, 이 두 조건 중 하나라도 만족하면 Feature 라벨이 부여됩니다.
  - 조건 : 브랜치 이름이 `feature`로 시작(`^feature`)하거나, 브랜치 이름에 `feature` 문자열이 포함될 때.

이제 어떤 Labeler에게 동작을 수행할 지 명령을 내렸으니, Workflow 라는 것을 만들어야합니다.
Workflow는 일종의 Trigger입니다. Github에서 제공하는 기능이며, 어떤 상황에 (이 상황을 이벤트라고 생각해주세요) 어떤 동작을 수행하게 할건지를 명시할 수 있죠.

그러면 저희는 어떤 동작을 수행하게 할것인지는 위해서 작성했습니다. 이제 위 동작을 "언제" 수행하게 할건지를 명시하면 됩니다.

`Pull Request`가 요청되었을 때 `Labeler`가 동작하도록 수행하고 싶습니다.
워크플로우 관련 동작을 위해서는 `.github` 폴더 내에 `workflows`라는 폴더를 만들어주세요.
해당 폴더 내에 `labeler.yml` 이라는 새로운 폴더를 만들어주세요

```yml
name: "PR이 요청될 때 Labeler가 동작한다."
on:
  - pull_request_target

jobs:
  labeler:
    permissions:
      contents: read
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
      - uses: actions/labeler@v5
```

- `name` 이라는 필드는 워크플로우의 이름을 지정합니다. 이 워크플로우를 식별할 수 있는 이름을 명시하면 됩니다.
- `on` 이라는 필드는 트리거 이벤트를 명시합니다. pull_request_target이라는 것은 PR이 생성되거나, 업데이트될 때를 의미합니다.
- `jobs` 는 실행할 작업을 명시합니다. 위 코드에서는 labeler 관련 동작을 수행합니다.
- `permissions`는 해당 워크플로우의 권한을 정의합니다.위 코드에서는 코드나 파일을 읽을 수 있는 권한을 주었습니다. 또한 PR을 업데이트할 수 있도록 쓰기 권한도 부여했습니다.
- `runs-on` 은 어떤 환경에서 워크플로우가 실행될 지 정의합니다. (일종의 가상 머신입니다.)
- `steps`는 실행 단계를 명시합니다. labeler를 실행하도록 되어있는데 labeler는 자동으로 저희가 사전에 작성한 `labeler.yml`을 실행하게 됩니다.

지금까지 작성된 코드는 [여기서](https://github.com/Hong-JunHyeok/github-action-test/commit/abe45667b885c5ea0afb172469f7f948e292fc7b) 확인하실 수 있습니다.

이제 모든 준비가 완료되었으니 QA를 진행해보겠습니다.

`main`브랜치에서 `feature/a` 라는 이름의 브랜치로 checkout 해보겠습니다.

```shell
github-action-test % git checkout -b feature/a
Switched to a new branch 'feature/a'
github-action-test %
```

변경사항을 만들고 origin에 push 해보도록 하겠습니다.

그러면 Github에서 PR을 요청하라고 Alert가 나타나게 될겁니다.

![PR Alert](https://github.com/user-attachments/assets/049e2ffb-0252-4a68-ba4e-fe796e95e36a)

이제 버튼을 클릭하고 PR을 생성해주면 됩니다.

![Create PR](https://github.com/user-attachments/assets/326135a1-3ba3-4d2d-a036-12ca39d76df7)

PR을 올렸을 때 Gihub Action이 트리거되어서 Labeler가 자동으로 실행되는 모습을 확인할 수 있습니다.

![Labeler Workflow Run](https://github.com/user-attachments/assets/586378ac-a4b1-4785-89b5-1596f9d435d8)

PR에 자동으로 라벨이 반영되었다면 성공입니다.

![Labele Result](https://github.com/user-attachments/assets/3e06f143-1120-431d-a58f-5adeacff6115)

좀 더 확장해서 여러가지 브랜츠들에 대응되도록 설정할수도 있겠죠?

지금 여러분이 보고계신 테크블로그는 아래와 같이 Labeler를 사용하고 있습니다.

```yml
Feature:
  - head-branch: ["^feature", "feature"]

Fix:
  - head-branch: ["^fix", "fix"]

Techdept:
  - head-branch: ["^techdept", "techdept"]

Article:
  - head-branch: ["^article", "article"]
```

이제 여러분의 서비스에 맞게 알맞게 잘 활용해보세요

지금까지 설명한 Labeler의 기능은 [여기](https://github.com/Hong-JunHyeok/github-action-test/pulls)서 확인해볼 수 있습니다.
