import { useForm } from "react-hook-form";

type FormValues = {
  searchFilter: string;
};

type SearchBarFilterProps = {
  placeholder: string;
  handleSubmit: (filterValue: string) => void;
};

const SearchBarFilter = (props: SearchBarFilterProps) => {
  const { placeholder, handleSubmit } = props;
  const {
    register,
    reset,
    handleSubmit: formSubmit
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    handleSubmit(data.searchFilter);
    reset({
      searchFilter: "",
    });
  };

  return (
    <>
      <form
        onSubmit={formSubmit(onSubmit)}
        style={{
          backgroundColor: "transparent",
          minHeight: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: 20,
          }}
        >
          <input
            className="search-bar"
            autoComplete="off"
            autoCorrect="off"
            type="text"
            placeholder={placeholder}
            {...register("searchFilter", {
              maxLength: 14,
            })}
          />
        </div>
      </form>
    </>
  );
};

export default SearchBarFilter;
