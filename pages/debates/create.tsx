import { useRouter } from "next/router";
import { useState } from "react";

import { CATEGORIES } from "../../utils/common/constant";
import {
  useInput,
  useRadio,
  useSelect,
} from "../../utils/common/useInputSelect";
import { useGetUser } from "../../utils/queries/users";
import { usePostDebate } from "../../utils/queries/debates";

import CreateOrEdit from "../../components/debates/CreateOrEdit";
import CheckSignInModal from "../../components/common/modal/CheckSignInModal";

export default function Create() {
  const router = useRouter();
  const [isCheckModalOn, setIsCheckModalOn] = useState<boolean>(false);
  const [isCancelModalOn, setIsCancelModalOn] = useState<boolean>(false);

  const titleInput = useInput("", "");
  const categorySelect = useSelect(CATEGORIES[0]);
  const prosConsRadio = useRadio("true", "prosCons");
  const contentsInput = useInput("", "");

  const user = useGetUser();
  const postDebate = usePostDebate();

  const handleCreate = () => {
    if (!user.data) {
      setIsCheckModalOn(true);
    } else {
      postDebate.mutate({
        title: titleInput.value,
        author_pros: prosConsRadio.value,
        category: categorySelect.value,
        contents: contentsInput.value,
        author_id: user.data?.id || "",
      });
    }
  };

  return (
    <div className="inner">
      <CheckSignInModal
        isModalOn={isCheckModalOn}
        setIsModalOn={setIsCheckModalOn}
      />
      <CreateOrEdit
        isCancelModalOn={isCancelModalOn}
        setIsCancelModalOn={setIsCancelModalOn}
        titleInput={titleInput}
        categorySelect={categorySelect}
        prosConsRadio={prosConsRadio}
        contentsInput={contentsInput}
        handler={handleCreate}
        createOrEdit="작성"
        routerPush={() => {
          router.push("/debates");
        }}
      />
    </div>
  );
}
