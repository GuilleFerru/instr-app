export const routineCrudCommonActions = (
    setTag,
    setDescription,
    setNicknameError,
    setPlantError,
    setAttelierError,
    setTagError,
    setFrequencyError,
    setCheckDaysError,
    setOtherCheckDayError,
    setIsDialogOpen,
    setOtherCheckDay,
    setStartDay,
    setShowCheckDay,
    setShowOtherCheckDay,
    setCheckDays,
    setAlert
) => {

    const handleTagInput = (e) => {
        setTag(e.target.value)
    }

    const handleDescriptionInput = (e) => {
        setDescription(e.target.value)
    }

    const errorDefault = () => {
        setNicknameError(false);
        setPlantError(false);
        setAttelierError(false);
        setTagError(false);
        setFrequencyError(false);
        setCheckDaysError(false);
        setOtherCheckDayError(false);
        setIsDialogOpen(false);
    }

    const handleOtherCheckDay = event => {
        setOtherCheckDay(event.target.value);
        setStartDay(new Date(new Date(event.target.value).getFullYear(), new Date(event.target.value).getMonth(), 1));
    }

    const validateInputs = (nickname, plant, attelier, tag, frequency, checkDays, otherCheckDay) => {
        nickname === '' ? setNicknameError(true) : setNicknameError(false);
        plant === 0 ? setPlantError(true) : setPlantError(false);
        attelier === 0 ? setAttelierError(true) : setAttelierError(false);
        tag === '' ? setTagError(true) : setTagError(false);
        frequency === '' ? setFrequencyError(true) : setFrequencyError(false);
        checkDays.length === 0 ? setCheckDaysError(true) : setCheckDaysError(false);
        otherCheckDay === null ? setOtherCheckDayError(true) : setOtherCheckDayError(false);
    }

    const enableFrequencyInputs = (flag) => {
        if (flag) {
            setOtherCheckDay(null)
            setShowCheckDay(true);
            setShowOtherCheckDay(false);
        } else {
            setCheckDays([])
            setShowCheckDay(false);
            setShowOtherCheckDay(true);
        }
    }

    const showAlert = (severity, title, message, messageAction, collapse) => {
        setAlert({
            severity: severity,
            title: title,
            message: message,
            messageAction: messageAction,
            collapse: collapse
        })
    }

    return {
        handleTagInput,
        handleDescriptionInput,
        errorDefault,
        handleOtherCheckDay,
        validateInputs,
        enableFrequencyInputs,
        showAlert
    }
}