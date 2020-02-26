
async function countreports(tab)
{
    let ret = []
    let x = 0;
    tab = await sorreportedtbyid(tab);
    for (let i = 0; i < tab.length;i++)
    {
        let num = tab[i].reported_id;
        ret[num] = ret[num] ? ret[num] + 1 : 1;
    }
    ret = await sortreported(ret);
    return (ret);
}

async function sorreportedtbyid(tab)
{
    for (let i = 0; i < tab.length - 1;i++)
    {
        if (tab[i].reported_id > tab[i + 1].reported_id)
        {
            let tmp = tab[i];
            tab[i] = tab[i + 1];
            tab[i + 1] = tmp;
            i = -1
        }
    }
    return (tab);
}

async function sortreported(tab)
{
    let i = 0;
    let ret = [];
    for(let key in tab)
        if (key)
            ret[i++] = {id : key, reports : tab[key]};
    for (let x = 0; x < ret.length - 1;x++)
        if (ret[x].reports < ret[x + 1].reports)
        {
            let tmp = ret[x];
            ret[x] = ret[x + 1];
            ret[x + 1] = tmp;
            x = -1
        }
    return (ret);
}

module.exports = {	countreports,
                    sorreportedtbyid,
                    sortreported
				};